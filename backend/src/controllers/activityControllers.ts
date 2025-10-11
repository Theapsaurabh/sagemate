import { Request, Response, NextFunction } from "express";
import { Activity, IActivity } from "../models/activity";
import { logger } from "../utils/logger";

interface AuthRequest extends Request {
  user?: any;
}

export const logActivity = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { type, name, description, duration, difficulty, feedback, scheduledFor } = req.body;
    const userId = req.user._id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    // Validate required fields
    if (!type || !name) {
      return res.status(400).json({
        success: false,
        message: "Type and name are required fields"
      });
    }

    const activityData: any = {
      type,
      name,
      description,
      duration,
      difficulty,
      feedback,
      userId,
      status: scheduledFor ? 'scheduled' : 'completed',
      timestamp: new Date()
    };

    if (scheduledFor) {
      activityData.scheduledFor = new Date(scheduledFor);
    }

    const activity = new Activity(activityData);
    await activity.save();
    
    logger.info(`Activity logged for user ${userId}`, { 
      activityId: activity._id, 
      type: activity.type 
    });

    res.status(201).json({
      success: true,
      message: "Activity logged successfully",
      data: activity,
    });

  } catch (error) {
    logger.error("Error logging activity:", error);
    next(error);
  }
};

export const getUpcomingActivities = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user._id;
    const { limit = 10, page = 1 } = req.query;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    
    const upcomingActivities = await Activity.find({
      userId,
      status: 'scheduled',
      scheduledFor: { $gte: new Date() }
    })
    .sort({ scheduledFor: 1 })
    .skip(skip)
    .limit(parseInt(limit as string))
    .select('type name description duration difficulty scheduledFor status')
    .exec();

    const totalCount = await Activity.countDocuments({
      userId,
      status: 'scheduled',
      scheduledFor: { $gte: new Date() }
    });

    logger.info(`Retrieved ${upcomingActivities.length} upcoming activities for user ${userId}`);

    res.status(200).json({
      success: true,
      data: {
        activities: upcomingActivities,
        pagination: {
          currentPage: parseInt(page as string),
          totalPages: Math.ceil(totalCount / parseInt(limit as string)),
          totalCount,
          hasNext: skip + upcomingActivities.length < totalCount
        }
      }
    });

  } catch (error) {
    logger.error("Error fetching upcoming activities:", error);
    next(error);
  }
};

export const getActivityHistory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user._id;
    const { limit = 10, page = 1, type, days } = req.query;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    
    let dateFilter = {};
    if (days) {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(days as string));
      dateFilter = { timestamp: { $gte: startDate } };
    }

    let typeFilter = {};
    if (type) {
      typeFilter = { type: type };
    }

    const activities = await Activity.find({
      userId,
      status: 'completed',
      ...dateFilter,
      ...typeFilter
    })
    .sort({ timestamp: -1 })
    .skip(skip)
    .limit(parseInt(limit as string))
    .select('type name description duration difficulty feedback timestamp')
    .exec();

    const totalCount = await Activity.countDocuments({
      userId,
      status: 'completed',
      ...dateFilter,
      ...typeFilter
    });

    res.status(200).json({
      success: true,
      data: {
        activities,
        pagination: {
          currentPage: parseInt(page as string),
          totalPages: Math.ceil(totalCount / parseInt(limit as string)),
          totalCount,
          hasNext: skip + activities.length < totalCount
        }
      }
    });

  } catch (error) {
    logger.error("Error fetching activity history:", error);
    next(error);
  }
};

export const updateActivityStatus = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { activityId } = req.params;
    const { status, feedback } = req.body;
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    const activity = await Activity.findOneAndUpdate(
      { _id: activityId, userId },
      { 
        status,
        ...(feedback && { feedback }),
        ...(status === 'completed' && { timestamp: new Date() })
      },
      { new: true, runValidators: true }
    );

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found"
      });
    }

    logger.info(`Activity status updated for user ${userId}`, { 
      activityId, 
      newStatus: status 
    });

    res.status(200).json({
      success: true,
      message: "Activity updated successfully",
      data: activity
    });

  } catch (error) {
    logger.error("Error updating activity status:", error);
    next(error);
  }
};

export const getActivityStats = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user._id;
    const { days = 30 } = req.query;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days as string));

    const stats = await Activity.aggregate([
      {
        $match: {
          userId: userId,
          status: 'completed',
          timestamp: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          totalDuration: { $sum: '$duration' },
          avgDifficulty: { $avg: '$difficulty' }
        }
      },
      {
        $project: {
          type: '$_id',
          count: 1,
          totalDuration: 1,
          avgDifficulty: { $round: ['$avgDifficulty', 2] },
          _id: 0
        }
      }
    ]);

    const totalActivities = await Activity.countDocuments({
      userId,
      status: 'completed',
      timestamp: { $gte: startDate }
    });

    const upcomingCount = await Activity.countDocuments({
      userId,
      status: 'scheduled',
      scheduledFor: { $gte: new Date() }
    });

    res.status(200).json({
      success: true,
      data: {
        summary: {
          totalActivities,
          upcomingCount,
          period: `${days} days`
        },
        byType: stats
      }
    });

  } catch (error) {
    logger.error("Error fetching activity stats:", error);
    next(error);
  }
};
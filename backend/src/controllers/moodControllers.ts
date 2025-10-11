import { Request, Response, NextFunction } from "express";
import { Mood } from "../models/mood";
import { logger } from "../utils/logger";
export const createMood = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { score, note, context, activities } = req.body;
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                message: "User not authenticated"
            });
        }
        const mood = new Mood({
            score,
            note,
            context,
            activities,
            timestamp: new Date(),
            userId,
        });
        await mood.save();
        logger.info('Mood logged for user ', userId);
        return res.status(201).json({
            succcess: true,
            data: mood,
        });
    } catch (error) {
        return next(error);
    }
};
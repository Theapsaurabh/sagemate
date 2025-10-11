import express from 'express';
import {
  logActivity,
  getUpcomingActivities,
  getActivityHistory,
  updateActivityStatus,
  getActivityStats
} from '../controllers/activityControllers';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/log', auth, logActivity);
router.get('/upcoming', auth, getUpcomingActivities);
router.get('/history', auth, getActivityHistory);
router.get('/stats', auth, getActivityStats);
router.patch('/:activityId/status', auth, updateActivityStatus);

export default router;
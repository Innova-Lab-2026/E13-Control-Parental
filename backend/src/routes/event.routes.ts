import { Router } from 'express';
import {
  recordEvent,
  getEvents,
  getAlerts,
  markAlertRead
} from '../controllers/event.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Endpoint for protected devices to record events (can use device token or auth)
router.post('/', recordEvent);

// Protected routes for responsible dashboard
router.get('/', authenticateToken, getEvents);
router.get('/alerts', authenticateToken, getAlerts);
router.patch('/alerts/:id/read', authenticateToken, markAlertRead);

export default router;

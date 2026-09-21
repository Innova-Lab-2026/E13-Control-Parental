import { Router } from 'express';
import {
  getBlocklist,
  addCustomBlocklistItem,
  removeCustomBlocklistItem,
  checkDomain
} from '../controllers/blocklist.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Public route for local VPN / mobile app domain checking
router.post('/check', checkDomain);

// Protected routes for responsible management
router.get('/', authenticateToken, getBlocklist);
router.post('/custom', authenticateToken, addCustomBlocklistItem);
router.delete('/custom/:id', authenticateToken, removeCustomBlocklistItem);

export default router;

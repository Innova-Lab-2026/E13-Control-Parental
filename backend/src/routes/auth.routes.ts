import { Router } from 'express';
import { registerResponsible, loginResponsible } from '../controllers/auth.controller';

const router = Router();

router.post('/register', registerResponsible);
router.post('/login', loginResponsible);

export default router;

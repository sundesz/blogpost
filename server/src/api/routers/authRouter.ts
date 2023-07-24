import { Router } from 'express';
import authController from '../controllers/authController';
import {
  validateRequest,
  userAuthSchema,
} from '../../middleware/validateRequest';

const authRouter = Router();

authRouter.post(
  '/login',
  validateRequest(userAuthSchema),
  authController.handleLogin
);
authRouter.post('/logout', authController.handleLogout);
authRouter.get('/session', authController.isSessionAuthenticated);

export default authRouter;

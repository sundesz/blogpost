import { Router } from 'express';
import { isAdmin } from '../../middleware/helper';
import userController from '../controllers/userController';
import { profilePicUpload } from '../../middleware/imageUpload';
import {
  validateRequest,
  newUserSchema,
} from '../../middleware/validateRequest';
const userRouter = Router();

userRouter.post(
  '/',
  profilePicUpload.single('image'),
  validateRequest(newUserSchema),
  userController.create
);
userRouter.put('/toggle/:id', isAdmin, userController.toggle);

export default userRouter;

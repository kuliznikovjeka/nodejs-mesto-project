import express from 'express';
// controllers
import {
  getUsers,
  getUser,
  updateUserAvatar,
  updateUserProfile,
  getUserMe,
} from '../controllers/users';
// middlewares
import { validateRequest } from '../middlewares/validate-request';
// shared
import {
  validateAvatarUpdateSchema,
  validateUpdateUserProfileSchema,
  validateUserIdSchema,
} from '../shared/validators/request-validators';

export const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUserMe);
usersRouter.patch('/me', validateRequest(validateUpdateUserProfileSchema), updateUserProfile);
usersRouter.patch(
  '/me/avatar',
  validateRequest(validateAvatarUpdateSchema),
  updateUserAvatar,
);
usersRouter.get('/:userId', validateRequest(validateUserIdSchema), getUser);

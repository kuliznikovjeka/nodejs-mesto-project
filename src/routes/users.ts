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

usersRouter.get('/users', getUsers);
usersRouter.get('/users/me', getUserMe);
usersRouter.patch('/users/me', validateRequest(validateUpdateUserProfileSchema), updateUserProfile);
usersRouter.patch(
  '/users/me/avatar',
  validateRequest(validateAvatarUpdateSchema),
  updateUserAvatar,
);
usersRouter.get('/users/:userId', validateRequest(validateUserIdSchema), getUser);

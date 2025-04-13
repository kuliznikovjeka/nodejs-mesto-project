import express from 'express';
import {
  getUsers,
  getUser,
  createUser,
  updateUserAvatar,
  updateUserProfile,
} from '../controllers/users';

export const usersRouter = express.Router();

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:userId', getUser);
usersRouter.post('/users', createUser);
usersRouter.patch('/users/me', updateUserProfile);
usersRouter.patch('/users/me/avatar', updateUserAvatar);

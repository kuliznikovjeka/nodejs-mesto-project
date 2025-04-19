import express from 'express';
// controllers
import { notFounded } from '../controllers/not-founded';

export const notFoundRouter = express.Router();

notFoundRouter.all('*', notFounded);

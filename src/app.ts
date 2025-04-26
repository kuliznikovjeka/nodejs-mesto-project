import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
// shared
import { DATABASE_URL, SERVER_PORT } from './shared/env';
import {
  validateLoginSchema,
  validateCreateUserSchema,
} from './shared/validators/request-validators';
// routes
import { usersRouter } from './routes/users';
import { cardsRouter } from './routes/cards';
import { notFoundRouter } from './routes/not-founded';
// controllers
import { createUser, login } from './controllers/users';
// middlewares
import { authMiddleware } from './middlewares/auth';
import { centralizedErrorHandler } from './middlewares/centralized-error-handler';
import { requestLogger, errorLogger } from './middlewares/logger';
import { validateRequest } from './middlewares/validate-request';

mongoose.connect(DATABASE_URL).catch((err) => {
  console.error('Не удалось подключиться к серверу', err);
});

const app = express();
app.use(express.json());

app.use(requestLogger);

app.post('/signin', validateRequest(validateLoginSchema), login);
app.post('/signup', validateRequest(validateCreateUserSchema), createUser);

app.use(authMiddleware);

app.use(usersRouter);
app.use(cardsRouter);
app.use(notFoundRouter);

app.use(errorLogger);

app.use(centralizedErrorHandler);

app.listen(SERVER_PORT, () => {
  console.log(`Приложение запущено на порту ${SERVER_PORT}`);
});

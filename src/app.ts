// eslint-disable-next-line import/no-extraneous-dependencies
import 'dotenv/config';
import express, { Response, NextFunction } from 'express';
import mongoose from 'mongoose';
// shared
import { DATABASE_URL, SERVER_PORT } from './shared/env';
import { AuthorizedRequest } from './shared/types/authorized-request';
// routes
import { usersRouter } from './routes/users';
import { cardsRouter } from './routes/cards';
import { notFoundRouter } from './routes/not-founded';

mongoose.connect(DATABASE_URL);

const app = express();
app.use(express.json());
// ВРЕМЕННОЕ РЕШЕНИЕ, ТАК НАПИСАНО В ЗАДАНИИ ЯНДЕКС-ПРАКТИКУМА
app.use((req: AuthorizedRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: '67fa6a06e66ba372514ca5ab',
  };

  next();
});

app.use(usersRouter);
app.use(cardsRouter);
app.use(notFoundRouter);

app.listen(SERVER_PORT, () => {
  console.log(`Приложение запущено на порту ${SERVER_PORT}`);
});

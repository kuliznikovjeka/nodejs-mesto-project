import express, { Response, NextFunction } from "express";
import mongoose from "mongoose";
import { AuthorizedRequest } from "./shared/types/authorized-request";
import { usersRouter } from "./routes/users";
import { cardsRouter } from "./routes/cards";

const SERVER_PORT = 3000;
const DATABASE_URL = "mongodb://localhost:27017/mestodb";

mongoose.connect(DATABASE_URL);

const app = express();
app.use(express.json());
// ВРЕМЕННОЕ РЕШЕНИЕ, ТАК НАПИСАНО В ЗАДАНИИ ЯНДЕКС-ПРАКТИКУМА
app.use((req: AuthorizedRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: "67fa6a06e66ba372514ca5ab",
  };

  next();
});

app.use(usersRouter);
app.use(cardsRouter);

app.listen(SERVER_PORT, () => {
  console.log(`Приложение запущено на порту ${SERVER_PORT}`);
});

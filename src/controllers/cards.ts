import { Request, Response } from 'express';
import mongoose, { Error as MongooseError } from 'mongoose';
import { Card } from '../models/card';
import { errorMessages } from '../shared/error-messages';
import { httpCodeResponseName } from '../shared/http-code-response-name';
import { AuthorizedRequest } from '../shared/types/authorized-request';

export const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find({});
    res.status(httpCodeResponseName.ok).send(cards);
  } catch {
    res
      .status(httpCodeResponseName.internalServerError)
      .send({ message: errorMessages.serverEror });
  }
};

export const createCard = async (req: AuthorizedRequest, res: Response) => {
  const { name, link } = req.body;
  const owner = req.user?._id;

  try {
    if (owner && !mongoose.Types.ObjectId.isValid(owner)) {
      return res.status(httpCodeResponseName.badRequest).send({
        message: 'Передан некорректный _id пользователя',
      });
    }

    const card = await Card.create({ name, link, owner });
    res.status(httpCodeResponseName.created).send(card);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      return res.status(httpCodeResponseName.badRequest).send({
        message: `Переданы некорректные данные при создании карточки поста. \n ${error.message}`,
      });
    }

    res
      .status(httpCodeResponseName.internalServerError)
      .send({ message: errorMessages.serverEror });
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  const { cardId } = req.params;

  try {
    const card = await Card.findByIdAndDelete(cardId);

    if (!card) {
      return res.status(httpCodeResponseName.notFound).send({
        message: 'Карточка поста c указанным _id не найдена.',
      });
    }

    res.status(httpCodeResponseName.ok).send({
      message: 'Карточка поста успешно удалена',
    });
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      return res.status(httpCodeResponseName.badRequest).send({
        message: `Некорректный _id карточки поста. \n ${error.message}`,
      });
    }

    res
      .status(httpCodeResponseName.internalServerError)
      .send({ message: errorMessages.serverEror });
  }
};

export const addCardToFavorite = async (req: AuthorizedRequest, res: Response) => {
  const { cardId } = req.params;
  const userId = req.user?._id;

  try {
    if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(httpCodeResponseName.badRequest).send({
        message: 'Передан некорректный _id пользователя',
      });
    }

    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true, runValidators: true },
    );

    if (!updatedCard) {
      return res.status(httpCodeResponseName.notFound).send({
        message: 'Карточка поста с указанным id не найдена',
      });
    }

    res.status(httpCodeResponseName.ok).send({ message: 'Карточка поста добавлена в избранное' });
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      return res.status(httpCodeResponseName.badRequest).send({
        message: `Передан некорректный id карточки поста. \n ${error.message}`,
      });
    }

    if (error instanceof MongooseError.ValidationError) {
      return res.status(httpCodeResponseName.badRequest).send({
        message: `Переданы некорректные данные при добавлении карточки поста в избранное. \n ${error.message}`,
      });
    }

    res
      .status(httpCodeResponseName.internalServerError)
      .send({ message: errorMessages.serverEror });
  }
};

export const deleteCardFromFavorite = async (req: AuthorizedRequest, res: Response) => {
  const { cardId } = req.params;
  const userId = req.user?._id;

  try {
    if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(httpCodeResponseName.badRequest).send({
        message: 'Передан некорректный id пользователя',
      });
    }

    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true, runValidators: true },
    );

    if (!updatedCard) {
      return res.status(httpCodeResponseName.notFound).send({
        message: 'Карточка поста с указанным id не найдена',
      });
    }

    res.status(httpCodeResponseName.ok).send({
      message: 'Карточка поста удалена из избранного',
    });
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      return res.status(httpCodeResponseName.badRequest).send({
        message: `Некорректный id карточки поста. \n ${error.message}`,
      });
    }

    if (error instanceof MongooseError.ValidationError) {
      return res.status(httpCodeResponseName.badRequest).send({
        message: `Переданы некорректные данные при удалении карточки поста из избранного. \n ${error.message}`,
      });
    }

    res
      .status(httpCodeResponseName.internalServerError)
      .send({ message: errorMessages.serverEror });
  }
};

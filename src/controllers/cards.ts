import { Request, Response, NextFunction } from 'express';
import mongoose, { Error as MongooseError } from 'mongoose';
// models
import { Card } from '../models/card';
// shared
import { httpCodeResponseName } from '../shared/http-code-response-name';
import { AuthorizedRequest } from '../shared/types/authorized-request';
import { BadRequestError } from '../shared/errors/bad-request-error';
import { NotFoundError } from '../shared/errors/not-found-error';
import { ForbiddenError } from '../shared/errors/forbidden-error';
import { errorMessages } from '../shared/errors/error-messages';

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find({});
    res.status(httpCodeResponseName.ok).send(cards);
  } catch (error) {
    next(error);
  }
};

export const createCard = async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const owner = req.user?._id;

  try {
    const card = await Card.create({ name, link, owner });
    res.status(httpCodeResponseName.created).send(card);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      next(
        new BadRequestError(
          `Переданы некорректные данные при создании карточки поста. \n ${error.message}`,
        ),
      );
    } else {
      next(error);
    }
  }
};

export const deleteCard = async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const userId = req.user?._id;

  try {
    const card = await Card.findById(cardId);
    if (!card) throw new NotFoundError('Карточка поста c указанным _id не найдена');

    const isAnotherCreator = userId !== card.owner.toString();
    if (isAnotherCreator) throw new ForbiddenError('Нельзя удалить чужую карточку поста');

    await Card.findByIdAndDelete(cardId);

    res.status(httpCodeResponseName.ok).send({
      message: 'Карточка поста успешно удалена',
    });
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      next(new BadRequestError(`Некорректный _id карточки поста. \n ${error.message}`));
    } else {
      next(error);
    }
  }
};

export const addCardToFavorite = async (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  const userId = req.user?._id;

  try {
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true, runValidators: true },
    );

    if (!updatedCard) throw new NotFoundError('Карточка поста с указанным id не найдена');

    res.status(httpCodeResponseName.ok).send({ message: 'Карточка поста добавлена в избранное' });
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      next(new BadRequestError(`Передан некорректный id карточки поста. \n ${error.message}`));
    } else if (error instanceof MongooseError.ValidationError) {
      next(
        new BadRequestError(
          `Переданы некорректные данные при добавлении карточки поста в избранное. \n ${error.message}`,
        ),
      );
    } else {
      next(error);
    }
  }
};

export const deleteCardFromFavorite = async (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  const userId = req.user?._id;

  try {
    if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
      throw new BadRequestError(errorMessages.invalideFormatId);
    }

    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true, runValidators: true },
    );

    if (!updatedCard) throw new NotFoundError('Карточка поста с указанным id не найдена');

    res.status(httpCodeResponseName.ok).send({
      message: 'Карточка поста удалена из избранного',
    });
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      next(new BadRequestError(`Некорректный id карточки поста. \n ${error.message}`));
    } else if (error instanceof MongooseError.ValidationError) {
      next(
        new BadRequestError(
          `Переданы некорректные данные при удалении карточки поста из избранного. \n ${error.message}`,
        ),
      );
    } else {
      next(error);
    }
  }
};

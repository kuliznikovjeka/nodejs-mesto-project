import { Request, Response } from 'express';
import mongoose, { Error as MongooseError } from 'mongoose';
import { User } from '../models/user';
import { errorMessages } from '../shared/error-messages';
import { httpCodeResponseName } from '../shared/http-code-response-name';
import { AuthorizedRequest } from '../shared/types/authorized-request';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(httpCodeResponseName.ok).send(users);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      return res.status(httpCodeResponseName.badRequest).send({
        message: `Переданы некорректные данные при запросе пользователей. \n ${error.message}`,
      });
    }

    res
      .status(httpCodeResponseName.internalServerError)
      .send({ message: errorMessages.serverEror });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(httpCodeResponseName.badRequest).send({
        message: 'Пользователь с указанным _id не найден',
      });
    }

    const user = await User.findById(userId);
    res.status(httpCodeResponseName.ok).send(user);
  } catch {
    res
      .status(httpCodeResponseName.internalServerError)
      .send({ message: errorMessages.serverEror });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  try {
    const user = await User.create({ name, about, avatar });
    res.status(httpCodeResponseName.created).send(user);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      return res.status(httpCodeResponseName.badRequest).send({
        message: `Переданы некорректные данные при создании пользователя. \n ${error.message}`,
      });
    }

    res
      .status(httpCodeResponseName.internalServerError)
      .send({ message: errorMessages.serverEror });
  }
};

export const updateUserProfile = async (req: AuthorizedRequest, res: Response) => {
  const { name, about } = req.body;

  const userId = req.user?._id;

  try {
    if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(httpCodeResponseName.badRequest).send({
        message: 'Пользователь с указанным _id не найден',
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return res.status(httpCodeResponseName.notFound).send({
        message: 'Пользователь с указанным _id не найден',
      });
    }

    res.status(httpCodeResponseName.ok).send(updatedUser);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      return res.status(httpCodeResponseName.badRequest).send({
        message: `Переданы некорректные данные при обновлении данных пользователя. \n ${error.message}`,
      });
    }

    res
      .status(httpCodeResponseName.internalServerError)
      .send({ message: errorMessages.serverEror });
  }
};

export const updateUserAvatar = async (req: AuthorizedRequest, res: Response) => {
  const { avatar } = req.body;
  const userId = req.user?._id;

  try {
    if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(httpCodeResponseName.badRequest).send({
        message: 'Пользователь с указанным id не найден',
      });
    }

    const updatedUserAvatar = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true },
    );

    if (!updatedUserAvatar) {
      return res.status(httpCodeResponseName.notFound).send({
        message: 'Пользователь с указанным id не найден',
      });
    }

    res.send(updatedUserAvatar);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      return res.status(httpCodeResponseName.badRequest).send({
        message: `Переданы некорректные данные при обновлении данных пользователя. \n ${error.message}`,
      });
    }

    res
      .status(httpCodeResponseName.internalServerError)
      .send({ message: errorMessages.serverEror });
  }
};

import { Request, Response, NextFunction } from 'express';
import mongoose, { Error as MongooseError } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
// models
import { User } from '../models/user';
// shared
import { httpCodeResponseName } from '../shared/http-code-response-name';
import { mongoCodeResponseName } from '../shared/mongo-code-response-name';
import { AuthorizedRequest } from '../shared/types/authorized-request';
import { BadRequestError } from '../shared/errors/bad-request-error';
import { NotFoundError } from '../shared/errors/not-found-error';
import { UnauthorizedError } from '../shared/errors/unauthorized-error';
import { ConflictError } from '../shared/errors/conflict-error';
import { errorMessages } from '../shared/errors/error-messages';
import { JWT_SECRET } from '../shared/env';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({});
    res.status(httpCodeResponseName.ok).send(users);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) throw new NotFoundError(errorMessages.userNotFound);

    res.status(httpCodeResponseName.ok).send(user);
  } catch (error) {
    next(error);
  }
};

export const getUserMe = async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id;

  try {
    if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
      throw new BadRequestError(errorMessages.invalideFormatId);
    }

    const user = await User.findById(userId);
    if (!user) throw new NotFoundError(errorMessages.userNotFound);

    res.send(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await User.findUserByCredentials(email, password);
    const userId = user._doc._id.toString();

    const token = jwt.sign({ _id: userId }, JWT_SECRET, { expiresIn: '7d' });
    const maxAge = 7 * 24 * 60 * 60 * 1000;

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      maxAge,
    });

    res.send({ message: 'Аутентификация успешно пройдена!' });
  } catch (error) {
    if (error instanceof Error) {
      next(new UnauthorizedError(error.message));
    } else {
      next(error);
    }
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  try {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    });

    const userWithoutHashedPassword = {
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    };

    res.status(httpCodeResponseName.created).send(userWithoutHashedPassword);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      next(
        new BadRequestError(
          `Переданы некорректные данные при создании пользователя. \n ${error.message}`,
        ),
      );
    } else if (
      error instanceof Error
      && error.message.includes(mongoCodeResponseName.conflict.toString())
    ) {
      next(new ConflictError('Пользователь с таким email уже существует'));
    } else {
      next(error);
    }
  }
};

export const updateUserProfile = async (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction,
) => {
  const { name, about } = req.body;

  const userId = req.user?._id;

  try {
    if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
      throw new BadRequestError(errorMessages.invalideFormatId);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    );

    if (!updatedUser) throw new NotFoundError(errorMessages.invalideFormatId);

    res.status(httpCodeResponseName.ok).send(updatedUser);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      next(
        new BadRequestError(
          `Переданы некорректные данные при обновлении данных пользователя. \n ${error.message}`,
        ),
      );
    } else {
      next(error);
    }
  }
};

export const updateUserAvatar = async (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction,
) => {
  const { avatar } = req.body;
  const userId = req.user?._id;

  try {
    if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
      throw new BadRequestError(errorMessages.invalideFormatId);
    }

    const updatedUserAvatar = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true },
    );

    if (!updatedUserAvatar) throw new NotFoundError('Пользователь с указанным id не найден');

    res.send(updatedUserAvatar);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      next(
        new BadRequestError(
          `Переданы некорректные данные при обновлении данных пользователя. \n ${error.message}`,
        ),
      );
    } else {
      next(error);
    }
  }
};

import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// shared
import { AuthorizedRequest } from '../shared/types/authorized-request';
import { httpCodeResponseName } from '../shared/http-code-response-name';
import { errorMessages } from '../shared/errors/error-messages';
import { JWT_SECRET } from '../shared/env';

export const authMiddleware = (req: AuthorizedRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(httpCodeResponseName.unauthorized).send({ message: errorMessages.needAuth });
  }

  const token = authorization.replace('Bearer ', '');
  let payload: jwt.JwtPayload | string;

  try {
    payload = jwt.verify(token, JWT_SECRET) as { _id: string; iat: number; exp: number };
  } catch {
    return res.status(httpCodeResponseName.unauthorized).send({ message: errorMessages.needAuth });
  }

  req.user = {
    _id: payload._id,
  };

  next();
};

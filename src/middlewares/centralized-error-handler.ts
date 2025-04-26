import { Request, Response } from 'express';
// shared
import { ErrorWithStatusCode } from '../shared/types/error-with-status-code';
import { httpCodeResponseName } from '../shared/http-code-response-name';
import { errorMessages } from '../shared/errors/error-messages';

export const centralizedErrorHandler = (err: ErrorWithStatusCode, req: Request, res: Response) => {
  const { message, statusCode = httpCodeResponseName.internalServerError } = err;

  res.status(statusCode).send({
    message:
      statusCode === httpCodeResponseName.internalServerError ? errorMessages.serverEror : message,
  });
};

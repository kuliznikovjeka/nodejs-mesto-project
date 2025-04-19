import { Request, Response } from 'express';
// shared
import { httpCodeResponseName } from '../shared/http-code-response-name';
import { errorMessages } from '../shared/error-messages';

export const notFounded = async (req: Request, res: Response) => {
  res.status(httpCodeResponseName.notFound).send({ message: errorMessages.notFoundedError });
};

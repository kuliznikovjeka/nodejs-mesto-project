import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
// shared
import { httpCodeResponseName } from '../shared/http-code-response-name';

// eslint-disable-next-line arrow-body-style
export const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const dataToValidate = {
      body: req.body,
      params: req.params,
      query: req.query,
    };

    const result = schema.safeParse(dataToValidate);

    if (!result.success) {
      return res.status(httpCodeResponseName.badRequest).json({
        statusCode: httpCodeResponseName.badRequest,
        error: 'Bad Request',
        message: result.error.errors,
      });
    }

    next();
  };
};

import { httpCodeResponseName } from '../http-code-response-name';

export class BadRequestError extends Error {
  statusCode;

  constructor(message: string) {
    super(message);
    this.statusCode = httpCodeResponseName.badRequest;
  }
}

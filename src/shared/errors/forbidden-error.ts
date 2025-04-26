import { httpCodeResponseName } from '../http-code-response-name';

export class ForbiddenError extends Error {
  statusCode;

  constructor(message: string) {
    super(message);
    this.statusCode = httpCodeResponseName.forbidden;
  }
}

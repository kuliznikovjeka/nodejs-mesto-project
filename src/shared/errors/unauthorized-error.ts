import { httpCodeResponseName } from '../http-code-response-name';

export class UnauthorizedError extends Error {
  statusCode;

  constructor(message: string) {
    super(message);
    this.statusCode = httpCodeResponseName.unauthorized;
  }
}

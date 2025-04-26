import { httpCodeResponseName } from '../http-code-response-name';

export class NotFoundError extends Error {
  statusCode;

  constructor(message: string) {
    super(message);
    this.statusCode = httpCodeResponseName.notFound;
  }
}

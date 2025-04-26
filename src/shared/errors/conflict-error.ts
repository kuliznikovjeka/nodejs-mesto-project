import { httpCodeResponseName } from '../http-code-response-name';

export class ConflictError extends Error {
  statusCode;

  constructor(message: string) {
    super(message);
    this.statusCode = httpCodeResponseName.conflict;
  }
}

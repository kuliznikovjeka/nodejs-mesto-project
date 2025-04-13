import { Request } from "express";

// Определим новый тип для Request с дополнительным свойством user
export interface AuthorizedRequest extends Request {
  user?: {
    _id: string;
  };
}

import express from 'express';
// controllers
import {
  createCard,
  deleteCard,
  getCards,
  addCardToFavorite,
  deleteCardFromFavorite,
} from '../controllers/cards';
// middlewares
import { validateRequest } from '../middlewares/validate-request';
// shared
import {
  validateCardIdSchema,
  validateCreateCardSchema,
} from '../shared/validators/request-validators';

export const cardsRouter = express.Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', validateRequest(validateCreateCardSchema), createCard);
cardsRouter.delete('/:cardId', validateRequest(validateCardIdSchema), deleteCard);
cardsRouter.put('/:cardId/likes', validateRequest(validateCardIdSchema), addCardToFavorite);
cardsRouter.delete('/:cardId/likes', validateRequest(validateCardIdSchema), deleteCardFromFavorite);

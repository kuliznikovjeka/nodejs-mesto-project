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

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', validateRequest(validateCreateCardSchema), createCard);
cardsRouter.delete('/cards/:cardId', validateRequest(validateCardIdSchema), deleteCard);
cardsRouter.put('/cards/:cardId/likes', validateRequest(validateCardIdSchema), addCardToFavorite);
cardsRouter.delete(
  '/cards/:cardId/likes',
  validateRequest(validateCardIdSchema),
  deleteCardFromFavorite,
);

import express from 'express';
// controllers
import {
  createCard,
  deleteCard,
  getCards,
  addCardToFavorite,
  deleteCardFromFavorite,
} from '../controllers/cards';
// shared
import {
  validateCardIdSchema,
  validateCreateCardSchema,
} from '../shared/validators/request-validators';

export const cardsRouter = express.Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', validateCreateCardSchema, createCard);
cardsRouter.delete('/:cardId', validateCardIdSchema, deleteCard);
cardsRouter.put('/:cardId/likes', validateCardIdSchema, addCardToFavorite);
cardsRouter.delete('/:cardId/likes', validateCardIdSchema, deleteCardFromFavorite);

import express from 'express';
import { createCard, deleteCard, getCards, addCardToFavorite, deleteCardFromFavorite } from '../controllers/cards';

export const cardsRouter = express.Router();

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', createCard);
cardsRouter.delete('/cards/:cardId', deleteCard);
cardsRouter.put('/cards/:cardId/likes', addCardToFavorite);
cardsRouter.delete('/cards/:cardId/likes', deleteCardFromFavorite);
import { Router } from 'express';
import { Segments } from 'celebrate';

import cardController from '../controllers/cards';
import validator from '../middlewares/validator';
import { card } from '../models/card';

// prettier-ignore
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = cardController;

const router = Router();

router.get('/', getCards);
router.post(
  '/',
  validator(Segments.BODY, card.validationSchema.create),
  createCard,
);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

export default router;

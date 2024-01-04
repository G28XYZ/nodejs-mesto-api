import { Router } from 'express';
import { Segments } from 'celebrate';

import cardController from '../controllers/cards';
import validator from '../middlewares/validator';
import { card } from '../models/card';

const { getCards, createCard, deleteCard } = cardController;

const router = Router();

router.get('/', getCards);
router.post(
  '/',
  validator(Segments.BODY, card.validationSchema.create),
  createCard,
);
router.delete('/:cardId', deleteCard);

export default router;

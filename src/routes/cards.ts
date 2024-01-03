import { Router } from 'express';
import cardController from '../controllers/cards';

const { getCards } = cardController;

const router = Router();

router.get('/', getCards);

export default router;

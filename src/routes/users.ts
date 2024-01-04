import { Router } from 'express';
import { Segments } from 'celebrate';

import userController from '../controllers/users';
import validator from '../middlewares/validator';
import { user } from '../models/user';

const { getUsers, getUser, createUser } = userController;

const router = Router();

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post(
  '/',
  validator(Segments.BODY, user.validationSchema.create),
  createUser,
);

export default router;

import { Router } from 'express';
import userController from './controllers/users.controller';
import validateUser from './middlewares/user.middleware';

const router = Router();

router.post(
  '/login',
  validateUser.checkEmailAndPassword,
  validateUser.validateEmail,
  validateUser.validatePassword,
  userController.login,
);

export default router;
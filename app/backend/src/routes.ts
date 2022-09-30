import { Router } from 'express';
import UserController from './controllers/users.controller';
import ValidateUser from './middlewares/user.middleware';

const validateUser = new ValidateUser();

const router = Router();

router.post(
  '/login',
  validateUser.checkEmailAndPassword,
  validateUser.validateEmail,
  validateUser.validatePassword,
  UserController.login,
);

router.get('/login/validate', UserController.validateToken);

export default router;
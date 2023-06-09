import { Router } from 'express';
import UserController from './controllers/users.controller';
import ValidateUser from './middlewares/user.middleware';
import TeamsController from './controllers/teams.controller';
import MatchController from './controllers/match.controller';
import LeaderboardsController from './controllers/leaderBoard.controller';
import { verifyJwt } from './middlewares/token.middleware';

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

router.get('/teams', TeamsController.getAll);

router.get('/teams/:id', TeamsController.getById);

router.get('/matches', MatchController.getAll);

router.post('/matches', verifyJwt, MatchController.create);

router.patch('/matches/:id/finish', verifyJwt, MatchController.finishMatch);

router.patch('/matches/:id', verifyJwt, MatchController.editMatch);

router.get('/leaderboard/home', LeaderboardsController.getAll);

router.get('/leaderboard/away', LeaderboardsController.getAllDone);

export default router;

import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { UserCredentials } from '../interfaces/user.interface';
import UserService from '../services/users.service';
import UserModel from '../database/models/UserModel';
import { createToken, verifyToken } from '../middlewares/token.middleware';

export default class UserController {
  static login = async (req: Request, res: Response) => {
    const userInfo = req.body as UserCredentials;

    const user = await UserService.login(userInfo.email) as UserModel;

    if (!user) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    const bcryptCheck = await bcrypt.compare(userInfo.password, user.password);

    if (!bcryptCheck) return res.status(401).json({ message: 'Incorrect email or password' });

    const token = await createToken(user.email);

    return res.status(200).json({ token });
  };

  static validateToken = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'No token was informed' });
    try {
      const verifyHeaderToken = verifyToken(token) as UserModel;
      const user = await UserService.login(verifyHeaderToken.email) as UserModel;

      return res.status(200).json({ role: user.role });
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
}

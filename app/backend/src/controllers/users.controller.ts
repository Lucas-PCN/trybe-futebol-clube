import { Request, Response } from 'express';
import userService from '../services/users.service';

const userController = {
  async login(req: Request, res: Response) {
    const { user } = req.body;

    const token = await userService.createToken(user);

    return res.status(200).json({ token });
  },
};

export default userController;

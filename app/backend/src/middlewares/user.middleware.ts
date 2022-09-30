import { Request, Response, NextFunction } from 'express';
import { UserCredentials } from '../interfaces/user.interface';

const EMAIL_REGEX = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
const PASSWORD_MIN_LENGTH = 6;

export default class ValidateUser {
  public checkEmailAndPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as unknown as UserCredentials;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
  
    next();
  };

  public validateEmail = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body as unknown as UserCredentials;

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: 'Invalid Email Format' });
    }

    next();
  };

  public validatePassword = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body as unknown as UserCredentials;

    if (user.password.length < PASSWORD_MIN_LENGTH) {
      return res.status(400)
        .json({ message: 'Password length must be more than 6 characters long' });
    }

    next();
  };
}
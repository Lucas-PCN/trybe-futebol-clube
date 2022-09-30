import { Request, Response, NextFunction } from 'express';

const EMAIL_REGEX = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
const PASSWORD_MIN_LENGTH = 6;

const validateUser = {
  checkEmailAndPassword: (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  },
  validateEmail: (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: 'Invalid Email Format' });
    }

    next();
  },
  validatePassword: (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;

    if (password.length < PASSWORD_MIN_LENGTH) {
      return res.status(400)
        .json({ message: 'Password length must be more than 6 characters long' });
    }

    next();
  },
};

export default validateUser;

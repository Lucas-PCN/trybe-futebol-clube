import { sign, SignOptions, verify, JwtPayload, Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const jwtConfig: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const secret: Secret = process.env.JWT_SECRET || 'sck942';

export const createToken = async (email: string): Promise<string> => {
  const token = sign({ email }, secret, jwtConfig);

  return token;
};

export const verifyToken = (token: string) => {
  try {
    const jwtDecoded = verify(token, secret) as JwtPayload;

    return jwtDecoded;
  } catch (error) {
    return error;
  }
};

export const verifyJwt = async (req: Request, res: Response, next: NextFunction) => {
  const jwt = req.headers.authorization as unknown as string;

  if (!jwt) return res.status(401).json({ message: 'Token not found' });

  try {
    verify(jwt, secret);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

import { sign, SignOptions, verify, JwtPayload, Secret } from 'jsonwebtoken';

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
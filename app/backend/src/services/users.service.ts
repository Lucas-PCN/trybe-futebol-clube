import { Secret, sign, SignOptions } from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import UserModel from '../database/models/UserModel';
import { JwtToken, UserCredentials } from '../interfaces/user.interface';
import 'dotenv/config';

const jwtConfig: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const errorMessage = 'Incorrect email or password';

const secret: Secret = process.env.JWT_SECRET || 'randomsecret';

const userService = {
  async createToken(user: UserCredentials): Promise<JwtToken> {
    const { email } = user;
    const { password } = user;

    const userLogin = await UserModel.findOne({ where: { email } });

    if (!userLogin) throw new Error(errorMessage);

    const token = sign({ email }, secret, jwtConfig);
    const bcryptCheck = await bcrypt.compare(password, userLogin.password);

    if (!bcryptCheck) throw new Error(errorMessage);

    return { token };
  },
};

export default userService;

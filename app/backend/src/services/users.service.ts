import UserModel from '../database/models/UserModel';

export default class UserService {
  static login = async (email: string) => {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) return false;

    return user;
  };
}

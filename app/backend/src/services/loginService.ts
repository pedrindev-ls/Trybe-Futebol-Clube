import { compareSync } from 'bcryptjs';
import User from '../database/models/Users';
import JwtService from './jwtService';

export default class LoginService {
  private _jwtService: JwtService;

  constructor(private user = User) {
    this._jwtService = new JwtService();
  }

  async validateLogin(email: string, password: string) {
    const item = await this.user.findOne({
      where: { email },
    });

    if (!item) {
      throw new Error('Incorrect email or password');
    }
    const checkPassword = compareSync(password, item.getDataValue('password'));

    if (!checkPassword) {
      throw new Error('Incorrect email or password');
    }

    const token = this._jwtService.createToken({
      id: item.getDataValue('id'),
      role: item.getDataValue('role'),
      email: item.getDataValue('email'),
      username: item.getDataValue('username'),
    });

    return token;
  }
}

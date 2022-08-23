import ErrorInterface from '../interfaces/errorInterface';
import User from '../database/models/Users';
import JwtService from './jwtService';
import PasswordCheck from './passwordCheck';

export default class LoginService {
  private _jwtService: JwtService;
  private _passwordCheck: PasswordCheck;

  constructor(private user = User) {
    this._jwtService = new JwtService();
    this._passwordCheck = new PasswordCheck();
  }

  async validateLogin(email: string, password: string) {
    const item = await this.user.findOne({ where: { email } });

    if (!item) {
      const error: ErrorInterface = new Error('Incorrect email or password');
      error.status = 401;
      throw error;
    }

    this._passwordCheck.comparePassword(password, item.getDataValue('password'));

    const token = this._jwtService.createToken({
      id: item.getDataValue('id'),
      role: item.getDataValue('role'),
      email: item.getDataValue('email'),
      username: item.getDataValue('username'),
    });

    return token;
  }
}

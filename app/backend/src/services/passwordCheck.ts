import { compareSync } from 'bcryptjs';
import ErrorInterface from '../interfaces/errorInterface';

export default class PasswordCheck {
  comparePassword = (password: string, dbPassword: string) => {
    const checkPassword = compareSync(password, dbPassword);

    if (!checkPassword) {
      const error: ErrorInterface = new Error('Incorrect email or password');
      error.status = 401;
      throw error;
    }

    return checkPassword;
  };
}

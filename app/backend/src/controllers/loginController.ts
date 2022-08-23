import { Request, Response } from 'express';
import ErrorInterface from '../interfaces/errorInterface';
import LoginService from '../services/loginService';

export default class LoginController {
  constructor(private loginService: LoginService) {}

  async validateLogin(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      const error: ErrorInterface = new Error('All fields must be filled');
      error.status = 400;

      throw error;
    }

    const token = await this.loginService.validateLogin(email, password);
    res.status(200).json({ token });
  }
}

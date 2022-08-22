import { Request, Response } from 'express';
import LoginService from '../services/loginService';

export default class LoginController {
  constructor(private loginService: LoginService) {}

  async validateLogin(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const token = await this.loginService.validateLogin(email, password);
    res.status(200).json({ token });
  }
}

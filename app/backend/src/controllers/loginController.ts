import { Request, Response } from 'express';
import JwtService from '../services/jwtService';
import ErrorInterface from '../interfaces/errorInterface';
import LoginService from '../services/loginService';

export default class LoginController {
  constructor(private loginService: LoginService, private jwtService: JwtService) {}

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

  async validateLoginWithToken(req: Request, res: Response): Promise<void> {
    const { authorization } = req.headers;

    if (!authorization) {
      const error: ErrorInterface = new Error('Token not Found');
      error.status = 401;
      throw error;
    }

    const item = this.jwtService.validateToken(authorization);

    res.status(200).json({ role: item.role });
  }
}

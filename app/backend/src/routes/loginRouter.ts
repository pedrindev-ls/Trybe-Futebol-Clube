import { Router } from 'express';
import LoginService from '../services/loginService';
import LoginController from '../controllers/loginController';
import JwtService from '../services/jwtService';

const loginRouter = Router();
const loginService = new LoginService();
const jwtService = new JwtService();
const loginController = new LoginController(loginService, jwtService);

loginRouter.post('/', (req, res) => loginController.validateLogin(req, res));
loginRouter.get('/validate', (req, res) => loginController.validateLoginWithToken(req, res));

export default loginRouter;

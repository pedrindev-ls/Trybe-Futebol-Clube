import { Router } from 'express';
import LoginService from '../services/loginService';
import LoginController from '../controllers/loginController';

const loginRouter = Router();
const loginService = new LoginService();
const loginController = new LoginController(loginService);

loginRouter.post('/', (req, res) => loginController.validateLogin(req, res));

export default loginRouter;

import { Router } from 'express';
import TeamsController from '../controllers/teamsController';
import TeamsService from '../services/teamsService';

const teamsRouter = Router();
const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

teamsRouter.get('/', (req, res) => teamsController.getTeams(req, res));
teamsRouter.get('/:id', (req, res) => teamsController.getTeam(req, res));

export default teamsRouter;

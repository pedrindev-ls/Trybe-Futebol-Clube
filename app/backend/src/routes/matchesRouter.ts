import { Router } from 'express';
import MatchesController from '../controllers/matchesController';
import MatchesService from '../services/matchesService';

const matchesRouter = Router();
const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

matchesRouter.get('/', (req, res) => matchesController.getAll(req, res));
matchesRouter.post('/', (req, res) => matchesController.addMatch(req, res));
matchesRouter.patch('/:id/finish', (req, res) => matchesController.finalizateMatch(req, res));
matchesRouter.patch('/:id', (req, res) => matchesController.updateMatch(req, res));

export default matchesRouter;

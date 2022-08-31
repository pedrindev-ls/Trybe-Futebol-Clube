import { Router } from 'express';
import LeaderboardsController from '../controllers/leaderboardsController';

const leaderboardsRouter = Router();
const lbController = new LeaderboardsController();

leaderboardsRouter.get('/', (req, res) => lbController.getLeaderboard(req, res));

export default leaderboardsRouter;

import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';
import LeaderboardsService from '../services/leaderboardService';
import MatchesService from '../services/matchesService';

export default class LeaderboardsController {
  constructor(
    private lbService = new LeaderboardsService(),
    private teamsService = new TeamsService(),
    private matchesService = new MatchesService(),
  ) {}

  async getLeaderboard(req: Request, res: Response) {
    const teams = await this.teamsService.get();
    const matches = await this.matchesService.getProgress(false);
    const item = await this.lbService.getLeaders(teams, matches);
    res.status(200).json(item);
  }
}

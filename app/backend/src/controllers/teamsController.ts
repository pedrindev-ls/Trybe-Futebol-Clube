import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';

export default class teamsController {
  constructor(private teamsService = new TeamsService()) {}

  async getTeams(req: Request, res: Response): Promise<void> {
    const teams = await this.teamsService.get();
    res.status(200).json(teams);
  }
}

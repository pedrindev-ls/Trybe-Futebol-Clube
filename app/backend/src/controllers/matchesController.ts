import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  async getAll(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    if (inProgress) {
      return this.getProgress(req, res);
    }

    const matches = await this.matchesService.get();
    res.status(200).json(matches);
  }

  async getProgress(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    const matches = this.matchesService.getProgress(JSON.stringify(inProgress));
    res.status(200).json(matches);
  }
}

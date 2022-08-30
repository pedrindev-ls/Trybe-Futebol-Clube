import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  async getAll(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    if (inProgress) {
      const other = await this.getProgress(req, res);
      return other;
    }

    const matches = await this.matchesService.get();
    res.status(200).json(matches);
  }

  async getProgress(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    const matches = await this.matchesService.getProgress(JSON.parse(inProgress as string));
    res.status(200).json(matches);
  }
}

// JSON.parse(inProgress as string)

import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  async getAll(req: Request, res: Response): Promise<void> {
    const matches = await this.matchesService.get();

    res.status(200).json(matches);
  }
}

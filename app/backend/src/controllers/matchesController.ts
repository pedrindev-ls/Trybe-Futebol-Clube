import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';
import JwtService from '../services/jwtService';
import ErrorInterface from '../interfaces/errorInterface';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
    private jwtService = new JwtService(),
  ) {}

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

  async addMatch(req: Request, res: Response): Promise<void> {
    const { authorization } = req.headers;
    if (!authorization) {
      const error: ErrorInterface = new Error('Token not Found');
      error.status = 401;
      throw error;
    }
    this.jwtService.validateToken(authorization);
    const values = req.body;
    const items = await this.matchesService.addMatch(values);

    res.status(201).json(items);
  }

  async finalizateMatch(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await this.matchesService.finish(Number(id));
    res.status(200).json({ message: 'Finished' });
  }

  async updateMatch(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchesService.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    res.status(200).json({ message: 'updated' });
  }
}

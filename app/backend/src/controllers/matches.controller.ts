import { Request, Response } from 'express';
import statusCodes from '../utils/statusCodes';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  private _matchesService: MatchesService;

  constructor(service: MatchesService) {
    this._matchesService = service;
  }

  public getAll = async (_req: Request, res: Response) => {
    const matches = await this._matchesService.getAll();

    return res.status(statusCodes.ok).json(matches);
  };
}

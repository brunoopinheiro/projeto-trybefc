import { Request, Response } from 'express';
import statusCodes from '../utils/statusCodes';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  private _leaderboardService: LeaderboardService;

  constructor(service: LeaderboardService) {
    this._leaderboardService = service;
  }

  public getHomeLeaderboard = async (_req: Request, res: Response) => {
    try {
      const leaderboard = await this._leaderboardService.getHomeLeaderboard();

      return res.status(statusCodes.ok).json(leaderboard);
    } catch (error) {
      return res.sendStatus(statusCodes.internalServerError);
    }
  };

  public getAwayLeaderboard = async (_req: Request, res: Response) => {
    try {
      const leaderboard = await this._leaderboardService.getAwayLeaderboard();

      return res.status(statusCodes.ok).json(leaderboard);
    } catch (err) {
      return res.sendStatus(statusCodes.internalServerError);
    }
  };
}

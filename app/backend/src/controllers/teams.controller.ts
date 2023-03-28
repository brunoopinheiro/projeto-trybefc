import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

export default class TeamsController {
  private _teamsService: TeamsService;

  constructor(teamService: TeamsService) {
    this._teamsService = teamService;
  }

  public getAll = async (_req: Request, res: Response) => {
    const teams = await this._teamsService.getAll();

    return res.status(200).json(teams);
  };
}

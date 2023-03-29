import { Request, Response } from 'express';
import statusCodes, { mapError } from '../utils/statusCodes';
import TeamsService from '../services/teams.service';

export default class TeamsController {
  private _teamsService: TeamsService;

  constructor(teamService: TeamsService) {
    this._teamsService = teamService;
  }

  public getAll = async (_req: Request, res: Response) => {
    const teams = await this._teamsService.getAll();

    return res.status(statusCodes.ok).json(teams);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { type, message } = await this._teamsService.getById(Number(id));

    if (type) return res.status(mapError(type)).json({ message });

    return res.status(statusCodes.ok).json(message);
  };
}

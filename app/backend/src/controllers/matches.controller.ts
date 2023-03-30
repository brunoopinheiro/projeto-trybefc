import { Request, Response } from 'express';
import statusCodes from '../utils/statusCodes';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  private _matchesService: MatchesService;

  constructor(service: MatchesService) {
    this._matchesService = service;
  }

  public getAll = async (req: Request, res: Response) => {
    try {
      let matches;

      const { inProgress } = req.query;

      if (!inProgress || inProgress === undefined) {
        matches = await this._matchesService.getAll();
        return res.status(statusCodes.ok).json(matches);
      }

      if (inProgress === 'true' || inProgress === 'false') {
        const q = inProgress === 'true';
        matches = await this._matchesService.getAllFiltered(q);
        return res.status(statusCodes.ok).json(matches);
      }
      return res.sendStatus(statusCodes.badRequest);
    } catch (error) {
      return res.sendStatus(statusCodes.internalServerError);
    }
  };

  public endMatch = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this._matchesService.endMatch(Number(id));

      return res.status(statusCodes.ok).send({ message: 'Finished' });
    } catch (error) {
      return res.sendStatus(statusCodes.internalServerError);
    }
  };

  public updateMatch = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { body } = req;

      await this._matchesService.updateMatch(Number(id), body);

      return res.status(statusCodes.ok).send({ message: 'Updated' });
    } catch (error) {
      return res.sendStatus(statusCodes.internalServerError);
    }
  };

  public createMatch = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const newMatch = await this._matchesService.createMatch(body);

      return res.status(statusCodes.created).json(newMatch);
    } catch (error) {
      return res.sendStatus(statusCodes.internalServerError);
    }
  };
}

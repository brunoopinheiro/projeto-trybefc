import { NextFunction, Request, Response } from 'express';
import TeamsService from '../services/teams.service';
import statusCodes from '../utils/statusCodes';

async function validateIds(teamA: number, teamB: number): Promise<boolean> {
  const validA = await TeamsService.verifyById(teamA);
  const validB = await TeamsService.verifyById(teamB);

  return validA && validB;
}

export default async function matchValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(statusCodes.unprocessableEntity).send({
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    const validIds = await validateIds(homeTeamId, awayTeamId);
    if (validIds) return next();

    return res.status(statusCodes.notFound).send({ message: 'There is no team with such id!' });
  } catch (error) {
    return res.sendStatus(statusCodes.internalServerError);
  }
}

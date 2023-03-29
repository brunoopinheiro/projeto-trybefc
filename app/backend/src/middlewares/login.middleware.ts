import { NextFunction, Request, Response } from 'express';
import statusCodes from '../utils/statusCodes';

export default function loginBodyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(statusCodes.badRequest).send({ message: 'All fields must be filled' });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(statusCodes.internalServerError);
  }
}

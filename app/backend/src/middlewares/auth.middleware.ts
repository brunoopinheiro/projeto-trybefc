import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import statusCodes from '../utils/statusCodes';

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { authorization: token } = req.headers;
    if (!token) {
      return res.status(statusCodes.unauthorized).send({ message: 'Token not found' });
    }

    const payload = await jwt.verify(token, process.env.JWT_SECRET as string);
    req.body.user = payload;

    next();
  } catch (err) {
    // console.log(err);
    return res.status(statusCodes.unauthorized).send({ message: 'Token must be a valid token' });
  }
}

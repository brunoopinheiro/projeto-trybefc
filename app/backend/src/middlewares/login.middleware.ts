import { NextFunction, Request, Response } from 'express';
import statusCodes from '../utils/statusCodes';

export default function loginBodyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(statusCodes.badRequest).send({ message: 'All fields must be filled' });
    }

    // validate email
    const emailReg = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    if (!emailReg.test(email) || password.length < 6) {
      return res.status(statusCodes.unauthorized).send({ message: 'Invalid email or password' });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(statusCodes.internalServerError);
  }
}

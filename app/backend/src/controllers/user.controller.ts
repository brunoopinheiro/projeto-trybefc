import { Request, Response } from 'express';
import statusCodes, { mapError } from '../utils/statusCodes';
import UsersService from '../services/users.service';

export default class UsersControler {
  private _usersService: UsersService;

  constructor(usersService: UsersService) {
    this._usersService = usersService;
  }

  public login = async (req: Request, res: Response) => {
    const { body } = req;
    const response = await this._usersService.login(body);

    if (response.type === 'unauthorized') {
      return res.status(mapError(response.type)).send({ message: response.message });
    }

    return res.status(statusCodes.ok).json({ token: response.message });
  };

  public loginRole = async (req: Request, res: Response) => {
    const { user } = req.body;

    return res.status(statusCodes.ok).json({ role: user.role });
  };
}

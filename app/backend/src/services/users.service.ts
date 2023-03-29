import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import IServiceResponse from '../interfaces/IServiceResponse';
import UserModel from '../database/models/UserModel';
// import IUser from '../interfaces/IUser';
import ILogin from '../interfaces/ILogin';

export default class UsersService {
  private userModel: ModelStatic<UserModel>;
  private _jwtConfig: SignOptions;
  private _jwtSecret: string;

  constructor(Model: ModelStatic<UserModel>) {
    this.userModel = Model;
    this._jwtSecret = process.env.JWT_SECRET as string;
    this._jwtConfig = {
      algorithm: 'HS256',
      expiresIn: '1d',
    };
  }

  private generateToken(payload: ILogin): string {
    return jwt.sign(payload, this._jwtSecret, this._jwtConfig);
  }

  public async login(login: ILogin): Promise<IServiceResponse> {
    const user = await this.userModel.findOne({ where: { email: login.email } });
    if (!user) return { message: 'Invalid email or password', type: 'unauthorized' };
    const validPWord = await bcrypt.compare(login.password, user.password);

    if (validPWord) {
      const token = this.generateToken({ ...login, role: user.role });
      return { type: null, message: token };
    }
    return { message: 'Invalid email or password', type: 'unauthorized' };
  }
}

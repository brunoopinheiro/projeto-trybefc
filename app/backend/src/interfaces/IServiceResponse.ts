import { StatusCodes } from '../utils/statusCodes';
import ITeam from './ITeam';
import IUser from './IUser';

interface IServiceResponse {
  message: string | ITeam | IUser;
  type: StatusCodes | null;
}

export default IServiceResponse;

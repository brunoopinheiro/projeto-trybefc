import { StatusCodes } from '../utils/statusCodes';
import ITeam from './ITeam';

interface IServiceResponse {
  message: string | ITeam;
  type: StatusCodes | null;
}

export default IServiceResponse;

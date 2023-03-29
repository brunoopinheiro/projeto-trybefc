import { ModelStatic } from 'sequelize';
import IServiceResponse from '../interfaces/IServiceResponse';
import TeamsModel from '../database/models/TeamModel';
import ITeam from '../interfaces/ITeam';

export default class TeamsService {
  private teamsModel: ModelStatic<TeamsModel>;

  constructor(Model: ModelStatic<TeamsModel>) {
    this.teamsModel = Model;
  }

  public async getAll(): Promise<ITeam[]> {
    const teams = await this.teamsModel.findAll();
    return teams;
  }

  public async getById(id: number): Promise<IServiceResponse> {
    const team = await this.teamsModel.findByPk(id);
    if (!team) {
      return { message: 'Team not found.', type: 'notFound' };
    }
    return { message: team, type: null };
  }
}

import { ModelStatic } from 'sequelize';
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
}

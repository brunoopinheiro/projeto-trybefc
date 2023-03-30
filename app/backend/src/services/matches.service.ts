import { ModelStatic } from 'sequelize';
import TeamsModel from '../database/models/TeamModel';
// import IServiceResponse from '../interfaces/IServiceResponse';
import MatchModel from '../database/models/MatchModel';
import IMatch from '../interfaces/IMatch';

export default class MatchesService {
  private _matchModel: ModelStatic<MatchModel>;

  constructor(Model: ModelStatic<MatchModel>) {
    this._matchModel = Model;
  }

  public async getAll(): Promise<IMatch[]> {
    const matches = await this._matchModel.findAll({
      include: [
        {
          model: TeamsModel,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: TeamsModel,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return matches;
  }
}

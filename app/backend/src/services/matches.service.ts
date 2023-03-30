import { ModelStatic } from 'sequelize';
import TeamsModel from '../database/models/TeamModel';
// import IServiceResponse from '../interfaces/IServiceResponse';
import MatchModel from '../database/models/MatchModel';
import IMatch, { IMatchUpdate } from '../interfaces/IMatch';

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

  public async getAllFiltered(query: boolean): Promise<IMatch[]> {
    const matches = await this._matchModel.findAll({
      where: { inProgress: query },
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

  public async endMatch(matchId: number): Promise<number> {
    const [affectedRows] = await this._matchModel.update(
      { inProgress: false },
      { where: { id: matchId } },
    );

    return affectedRows;
  }

  public async updateMatch(matchId: number, goals: IMatchUpdate): Promise<number> {
    const { homeTeamGoals, awayTeamGoals } = goals;
    const [affectedRows] = await this._matchModel.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id: matchId } },
    );

    return affectedRows;
  }
}

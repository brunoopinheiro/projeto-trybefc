import { ModelStatic } from 'sequelize';
import Leaderboard from '../database/models/LeaderboardModel';
import TeamsModel from '../database/models/TeamModel';
import { ITeamResult } from '../interfaces/ITeam';

export default class LeaderboardService {
  private _leaderboardModel: Leaderboard;
  private _teamsModel: ModelStatic<TeamsModel>;

  constructor(Model: ModelStatic<TeamsModel>) {
    this._teamsModel = Model;
    this._leaderboardModel = new Leaderboard(this._teamsModel);
  }

  public async getHomeLeaderboard(): Promise<ITeamResult[]> {
    const leaderboard = await this._leaderboardModel.getHomeLeaderboard();

    return leaderboard;
  }
}

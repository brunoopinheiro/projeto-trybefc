import { ModelStatic } from 'sequelize';
import { ITeamResult } from '../../interfaces/ITeam';
import TeamsModel from './TeamModel';
import TeamResult from './TeamResultModel';

class Leaderboard {
  private _teamsModel: ModelStatic<TeamsModel>;

  constructor(Model: ModelStatic<TeamsModel>) {
    this._teamsModel = Model;
  }

  public async getHomeLeaderboard() {
    const teams = await this._teamsModel.findAll();
    const teamsArr: ITeamResult[] = [];
    teams.forEach(async (team) => {
      const teamRes = new TeamResult(team.id);
      const teamObj = await teamRes.getHomeTeamObject();
      teamsArr.push(teamObj);
    });

    const leaderboard = Leaderboard.orderLeaderboard(teamsArr);
    return leaderboard;
  }

  static orderLeaderboard(teams: ITeamResult[]): ITeamResult[] {
    const ordered = teams.sort((a, b) =>
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor);

    return ordered;
  }
}

export default Leaderboard;

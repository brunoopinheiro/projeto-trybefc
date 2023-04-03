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
    const promises = teams.map(async (team) => {
      const teamRes = new TeamResult(team.id);
      const teamObj = await teamRes.getHomeTeamObject();
      return teamObj;
    });
    const result = await Promise.all(promises).then((teamsObjArr) => {
      teamsArr.push(...teamsObjArr);
      return teamsObjArr;
    }).catch((error) => console.error(error));

    if (result) {
      const leaderboard = Leaderboard.orderLeaderboard(result);
      return leaderboard;
    }
    return teamsArr;
  }

  public async getAwayLeaderboard() {
    const teams = await this._teamsModel.findAll();
    const teamsArr: ITeamResult[] = [];
    const promises = teams.map(async (team) => {
      const teamRes = new TeamResult(team.id);
      const teamObj = await teamRes.getAwayTeamObject();
      return teamObj;
    });
    const result = await Promise.all(promises).then((teamsObjArr) => {
      teamsArr.push(...teamsObjArr);
      return teamsObjArr;
    }).catch((error) => console.error(error));

    if (result) {
      const leaderboard = Leaderboard.orderLeaderboard(result);
      return leaderboard;
    }

    return teamsArr;
  }

  public async getLeaderboard() {
    const teams = await this._teamsModel.findAll();
    const teamsArr: ITeamResult[] = [];
    const promises = teams.map(async (team) => {
      const teamRes = new TeamResult(team.id);
      const teamObj = await teamRes.getFullTeamObject();
      return teamObj;
    });

    const result = await Promise.all(promises).then((teamsObjArr) => {
      teamsArr.push(...teamsObjArr);
      return teamsObjArr;
    }).catch((error) => console.error(error));

    if (result) {
      const leaderboard = Leaderboard.orderLeaderboard(result);
      return leaderboard;
    }

    return teamsArr;
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

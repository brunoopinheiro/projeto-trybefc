import { ITeamResult } from '../../interfaces/ITeam';
import { totalPoints, teamEfficiency } from '../../utils/soccerChampionshipFunctions';
import IMatch from '../../interfaces/IMatch';
import MatchModel from './MatchModel';
import TeamsModel from './TeamModel';

class TeamResult {
  private _teamId: number;

  constructor(teamId: number) {
    this._teamId = teamId;
  }

  private async getTeamName(): Promise<string> {
    const team = await TeamsModel.findByPk(this._teamId);
    if (team) return team.teamName;
    return 'unknow';
  }

  // private async getTeamMatches(): Promise<IMatch[]> {
  //   const id = this._teamId;
  //   const matches = await MatchModel.findAll({
  //     where: {
  //       $or: [
  //         { homeTeamId: id },
  //         { awayTeamId: id },
  //       ],
  //       inProgress: false,
  //     },
  //   });

  //   return matches;
  // }

  private async getHomeMatches(): Promise<IMatch[]> {
    const id = this._teamId;
    const matches = await MatchModel.findAll({
      where: { inProgress: false, homeTeamId: id },
    });

    return matches;
  }

  private async getAwayMatches(): Promise<IMatch[]> {
    const id = this._teamId;
    const matches = await MatchModel.findAll({
      where: { inProgress: false, awayTeamId: id },
    });

    return matches;
  }

  private getTotalVictories(matches: IMatch[]): IMatch[] {
    const id = this._teamId;
    const victories = matches.filter(({
      awayTeamId,
      awayTeamGoals,
      homeTeamId,
      homeTeamGoals,
    }) => {
      if (awayTeamId === id && awayTeamGoals > homeTeamGoals) return true;
      if (homeTeamId === id && homeTeamGoals > awayTeamGoals) return true;
      return false;
    });

    return victories;
  }

  private getTotalDraws(matches: IMatch[]): IMatch[] {
    // This function could be simpler, but ESLint would not allow. :)
    const id = this._teamId;
    const draws = matches.filter(({
      awayTeamId,
      awayTeamGoals,
      homeTeamId,
      homeTeamGoals,
    }) => {
      if (awayTeamId === id && awayTeamGoals === homeTeamGoals) return true;
      if (homeTeamId === id && homeTeamGoals === awayTeamGoals) return true;
      return false;
    });

    return draws;
  }

  private getTotalLosses(matches: IMatch[]): IMatch[] {
    const id = this._teamId;
    const losses = matches.filter(({
      awayTeamId,
      awayTeamGoals,
      homeTeamId,
      homeTeamGoals,
    }) => {
      if (awayTeamId === id && awayTeamGoals < homeTeamGoals) return true;
      if (homeTeamId === id && homeTeamGoals < awayTeamGoals) return true;
      return false;
    });

    return losses;
  }

  private getGoalsFavor(matches: IMatch[]): number {
    const id = this._teamId;
    const goalsFavor = matches.reduce((goals, {
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    }) => {
      if (homeTeamId === id) return goals + homeTeamGoals;
      if (awayTeamId === id) return goals + awayTeamGoals;
      return goals;
    }, 0);

    return goalsFavor;
  }

  private getGoalsOwn(matches: IMatch[]): number {
    const id = this._teamId;
    const goalsOwn = matches.reduce((goals, {
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    }) => {
      if (homeTeamId === id) return goals + awayTeamGoals;
      if (awayTeamId === id) return goals + homeTeamGoals;
      return goals;
    }, 0);

    return goalsOwn;
  }

  private async getTeamObject(games: IMatch[]): Promise<ITeamResult> {
    const name = await this.getTeamName();
    const victories = this.getTotalVictories(games);
    const draws = this.getTotalDraws(games);
    const [goalsFavor, goalsOwn] = [this.getGoalsFavor(games), this.getGoalsOwn(games)];
    const points = totalPoints(victories.length, draws.length);

    return {
      name,
      totalPoints: points,
      totalGames: games.length,
      totalVictories: victories.length,
      totalDraws: draws.length,
      totalLosses: this.getTotalLosses(games).length,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: teamEfficiency(points, games.length),
    };
  }

  public async getHomeTeamObject(): Promise<ITeamResult> {
    const games = await this.getHomeMatches();
    const teamObj = await this.getTeamObject(games);

    return teamObj;
  }

  public async getAwayTeamObject(): Promise<ITeamResult> {
    const games = await this.getAwayMatches();
    const teamObj = await this.getTeamObject(games);

    return teamObj;
  }

  public async getFullTeamObject(): Promise<ITeamResult> {
    const homeGames = await this.getHomeMatches();
    const awayGames = await this.getAwayMatches();
    const games = [...homeGames, ...awayGames];
    const teamObj = await this.getTeamObject(games);

    return teamObj;
  }
}

export default TeamResult;

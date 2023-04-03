interface ITeam {
  id: number;
  teamName: string;
}

interface ITeamResult {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}

export default ITeam;
export { ITeamResult };

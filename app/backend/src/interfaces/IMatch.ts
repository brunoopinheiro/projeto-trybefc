interface IMatch {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

interface IMatchUpdate {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

interface INewMatch {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export default IMatch;
export { IMatchUpdate, INewMatch };

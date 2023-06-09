const matchesMock = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Grêmio"
    }
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: "Internacional"
    },
    awayTeam: {
      teamName: "Santos"
    }
  },
  {
    id: 3,
    homeTeamId: 4,
    homeTeamGoals: 3,
    awayTeamId: 11,
    awayTeamGoals: 0,
    inProgress: false,
    homeTeam: {
      teamName: "Corinthians"
    },
    awayTeam: {
      teamName: "Napoli-SC"
    }
  },
];

const queryTrueMock = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: true,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Grêmio"
    }
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: true,
    homeTeam: {
      teamName: "Internacional"
    },
    awayTeam: {
      teamName: "Santos"
    }
  },
  {
    id: 3,
    homeTeamId: 4,
    homeTeamGoals: 3,
    awayTeamId: 11,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: "Corinthians"
    },
    awayTeam: {
      teamName: "Napoli-SC"
    }
  },
];

const updateMock = {
  homeTeamGoals: 3,
  awayTeamGoals: 1,
};

const newMatchBody = {
  homeTeamId: 16,
  awayTeamId: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}

const invalidMatchBody = {
  homeTeamId: 8,
  awayTeamId: 8,
  homeTeamGoals: 0,
  awayTeamGoals: 0,
}

const newMatch = {
  id: 50,
  ...newMatchBody,
  inProgress: true,
}

export default matchesMock;
export { queryTrueMock, updateMock, newMatch, newMatchBody, invalidMatchBody };

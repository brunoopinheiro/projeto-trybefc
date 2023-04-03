function totalPoints(victories: number, draws: number): number {
  return (victories * 3) + draws;
}

function teamEfficiency(points: number, games: number): string {
  const efficiency = (points / (games * 3)) * 100;
  return `${efficiency.toFixed(2)}`;
}

export { totalPoints, teamEfficiency };

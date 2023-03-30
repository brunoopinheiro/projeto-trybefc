function totalPoints(victories: number, draws: number): number {
  return (victories * 3) + draws;
}

function teamEfficiency(points: number, games: number): number {
  const efficiency = (points / (games * 3)) * 100;
  return parseFloat(efficiency.toFixed(2));
}

export { totalPoints, teamEfficiency };

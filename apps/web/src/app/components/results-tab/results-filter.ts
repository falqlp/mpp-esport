export function filterPredictedMatches<T extends { id: string }>(
  matches: T[],
  predictions: Array<{ matchId: string }>,
  onlyPredicted: boolean,
): T[] {
  if (!onlyPredicted) return matches;
  const predictedMatchIds = new Set(predictions.map(({ matchId }) => matchId));
  return matches.filter(({ id }) => predictedMatchIds.has(id));
}

export function isValidPredictionScore(scoreA: number | null, scoreB: number | null, wins: number): boolean {
  return (
    scoreA !== null &&
    scoreB !== null &&
    Number.isInteger(scoreA) &&
    Number.isInteger(scoreB) &&
    scoreA >= 0 &&
    scoreB >= 0 &&
    scoreA !== scoreB &&
    Math.max(scoreA, scoreB) === wins
  );
}

export function shouldShowPredictionScoreError(scoreA: number | null, scoreB: number | null, wins: number): boolean {
  return scoreA !== null && scoreB !== null && !isValidPredictionScore(scoreA, scoreB, wins);
}

export function adjustedOpponentScore(
  changedScore: number | null,
  opponentScore: number | null,
  wins: number,
): number | null {
  return changedScore === wins && opponentScore === wins ? wins - 1 : opponentScore;
}

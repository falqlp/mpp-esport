import { LolMatch } from './esports.types';

export function predictionPoints(
  format: LolMatch['format'],
  predictedWinnerId: string,
  predictedScore: [number, number],
  winnerId: string,
  score: [number, number],
): number {
  if (predictedWinnerId !== winnerId) return 0;
  const exactScore = predictedScore[0] === score[0] && predictedScore[1] === score[1];
  if (!exactScore) return 1;
  return format === 'BO5' ? 3 : format === 'BO3' ? 2 : 1;
}

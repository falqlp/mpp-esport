import { describe, expect, it } from 'vitest';
import { adjustedOpponentScore, isValidPredictionScore, shouldShowPredictionScoreError } from './prediction-score';

describe('isValidPredictionScore', () => {
  it.each([
    [[1, 0], 1],
    [[2, 0], 2],
    [[2, 1], 2],
    [[3, 2], 3],
  ] as const)('accepts a completed series score', (score, wins) => {
    expect(isValidPredictionScore(score[0], score[1], wins)).toBe(true);
  });

  it.each([
    [null, 1, 2],
    [2, null, 2],
    [1, 1, 2],
    [1, 0, 2],
    [-1, 2, 2],
    [2.5, 1, 3],
  ])('rejects an incomplete or impossible score', (scoreA, scoreB, wins) => {
    expect(isValidPredictionScore(scoreA, scoreB, wins)).toBe(false);
  });
});

describe('shouldShowPredictionScoreError', () => {
  it('shows an error once both entered scores form an impossible result', () => {
    expect(shouldShowPredictionScoreError(3, 3, 3)).toBe(true);
  });

  it('does not show an error while the score is incomplete', () => {
    expect(shouldShowPredictionScoreError(3, null, 3)).toBe(false);
  });

  it('does not show an error for a valid score', () => {
    expect(shouldShowPredictionScoreError(3, 1, 3)).toBe(false);
  });
});

describe('adjustedOpponentScore', () => {
  it.each([
    [3, 3, 3, 2],
    [2, 2, 2, 1],
    [1, 1, 1, 0],
  ])('lowers an opponent already at the winning score', (changed, opponent, wins, expected) => {
    expect(adjustedOpponentScore(changed, opponent, wins)).toBe(expected);
  });

  it('keeps an opponent below the winning score unchanged', () => {
    expect(adjustedOpponentScore(3, 1, 3)).toBe(1);
  });
});

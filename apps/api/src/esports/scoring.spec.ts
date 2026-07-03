import { describe, expect, it } from 'vitest';
import { predictionPoints } from './scoring';

describe('predictionPoints', () => {
  it('awards one point for the correct winner without the exact score', () => {
    expect(predictionPoints('BO3', 'a', [2, 0], 'a', [2, 1])).toBe(1);
  });

  it('awards two points for an exact BO3 score', () => {
    expect(predictionPoints('BO3', 'a', [2, 1], 'a', [2, 1])).toBe(2);
  });

  it('awards three points for an exact BO5 score', () => {
    expect(predictionPoints('BO5', 'b', [2, 3], 'b', [2, 3])).toBe(3);
  });

  it('awards no point for the wrong winner', () => {
    expect(predictionPoints('BO5', 'a', [3, 1], 'b', [2, 3])).toBe(0);
  });
});

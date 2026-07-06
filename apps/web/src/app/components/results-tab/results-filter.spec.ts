import { describe, expect, it } from 'vitest';
import { filterPredictedMatches } from './results-filter';

describe('filterPredictedMatches', () => {
  const matches = [{ id: 'm1' }, { id: 'm2' }, { id: 'm3' }];
  const predictions = [{ matchId: 'm2' }, { matchId: 'm3' }];

  it('keeps every match when the filter is disabled', () => {
    expect(filterPredictedMatches(matches, predictions, false)).toEqual(matches);
  });

  it('keeps only matches predicted by the user when enabled', () => {
    expect(filterPredictedMatches(matches, predictions, true)).toEqual([{ id: 'm2' }, { id: 'm3' }]);
  });
});

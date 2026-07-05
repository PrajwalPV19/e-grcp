import { describe, expect, it } from 'vitest';
import reportReducer from '../features/reports/reportSlice';

describe('reportSlice', () => {
  it('returns the initial state', () => {
    const state = reportReducer(undefined, { type: 'unknown' });
    expect(state.items).toEqual([]);
    expect(state.dataset).toEqual([]);
  });
});

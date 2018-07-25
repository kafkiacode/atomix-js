// @flow
/* global it, describe, expect */
import { createStore, initialState } from './index';

describe('redux data store', () => {
  it('is created matching the initial state static definition', () => {
    const store = createStore();
    expect(store.getState()).toEqual(initialState);
  });
});

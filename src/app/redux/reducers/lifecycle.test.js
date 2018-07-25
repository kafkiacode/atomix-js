// @flow
import lifecycle from './lifecycle';
import fullInitialState from '../initialState';
// import * as actionTypes from '../actionTypes';
import { screenIds } from '../../enums/general';
import { clockTick } from '../actions/player';
import { lifecycleMainMenu } from '../actions/lifecycle';
// import { lifecycleMainMenu, lifecycleGameLoad, lifecycleGamePause, lifecycleGameWin, lifecycleGameStart, lifecycleGamePauseEnd } from '../actions/lifecycle';

// It should match initial src/app/redux/initialState.lifecycle
// const initialState = {
//   screenId: screenIds.MAIN,
//   isPlaying: false,
//   gameState: s
//   isPaused: false,
// };

const initialState: typeof fullInitialState.lifecycle = fullInitialState.lifecycle;

describe('lifecycle reducer', () => {
  it('should return the initial state if an unrelated action is dispatched', () => {
    expect(lifecycle(undefined, clockTick())).toEqual(initialState);
  });
  it('should handle LIFECYCLE_MAIN_MENU actions', () => {
    expect(lifecycle(initialState, lifecycleMainMenu()))
      .toEqual({ ...initialState, screenId: screenIds.MAIN });
    expect(lifecycle({ ...initialState }, lifecycleMainMenu()))
      .toEqual({ ...initialState, screenId: screenIds.MAIN });
  });
  // it('should handle LIFECYCLE_GAME actions that get a isPlaying = false state', () => {
  //   const isPlayingFalseInitialTrue = { ...initialState, isPlaying: false };
  //   expect(lifecycle(isPlayingFalseInitialTrue, lifecycleGameLoad()))
  //     .toEqual({ ...initialState, screenId: screenIds.GAME });
  //   expect(lifecycle(isPlayingFalseInitialTrue, lifecycleGamePause()))
  //     .toEqual({ ...initialState, screenId: screenIds.GAME });
  //   expect(lifecycle(isPlayingFalseInitialTrue, lifecycleGameTimeup()))
  //     .toEqual({ ...initialState, screenId: screenIds.GAME });
  //   expect(lifecycle(isPlayingFalseInitialTrue, lifecycleGameWin()))
  //     .toEqual({ ...initialState, screenId: screenIds.GAME });
  // });
  // it('should handle LIFECYCLE_GAME actions that get a isPlaying = true state', () => {
  //   expect(lifecycle(initialState, lifecycleGameStart()))
  //     .toEqual({ ...initialState, screenId: screenIds.GAME, isPlaying: true });
  //   expect(lifecycle(initialState, lifecycleGamePauseEnd()))
  //     .toEqual({ ...initialState, screenId: screenIds.GAME, isPlaying: true });
  // });
});

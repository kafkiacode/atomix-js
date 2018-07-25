// @flow
import { type Saga } from 'redux-saga';
import { take, put, select } from 'redux-saga/effects';
import { type ReduxState } from '../initialState';
import { type Difficulty } from '../../types/general';
import {
  // LIFECYCLE_START,
  LIFECYCLE_GAME_ENTER,
  // LIFECYCLE_COUNT_SCORE_END,
  GAME_LEVEL_WIN,
  GAME_LEVEL_LOSE,
  LIFECYCLE_GAME_NEXT_LEVEL,
  LIFECYCLE_ATOMS_EXPLODE_END,
  LIFECYCLE_MAIN_MENU,
} from '../actionTypes';
import { gameLoadLevel, gameStart } from '../actions/game';
import {
  lifecycleGameShowReady,
  lifecycleGameOver,
  lifecycleCountScore,
  lifecycleGameWin,
  lifecycleMainMenu,
  lifecycleAtomsExplode,
  lifecycleCountScoreEnd,
} from '../actions/lifecycle';
import getLevel from '../../selectors/getLevel';

const getCurrentLevel = ({ game: { player: { levelNumber } } }: ReduxState): number => levelNumber;
const getDifficulty = ({ settings: { difficulty } }: ReduxState): Difficulty => difficulty;

export default function* lifecycleSaga(): Saga<void> {
  // yield take(LIFECYCLE_START);
  while (true) {
    yield take(LIFECYCLE_GAME_ENTER);
    yield put(lifecycleGameShowReady());
    const difficulty = yield select(getDifficulty);
    yield put(gameLoadLevel(getLevel(yield select(getCurrentLevel)), difficulty));
    while (true) {
      const endGameAction = yield take([GAME_LEVEL_WIN, GAME_LEVEL_LOSE]);
      if (endGameAction.type === GAME_LEVEL_LOSE) {
        yield put(lifecycleGameOver());
        yield take(LIFECYCLE_MAIN_MENU);
        break;
      } else {
        yield put(lifecycleAtomsExplode());
        yield take(LIFECYCLE_ATOMS_EXPLODE_END);
        yield put(lifecycleCountScore());
        yield put(lifecycleCountScoreEnd()); // for now
        // yield take(LIFECYCLE_COUNT_SCORE_END);
        yield put(lifecycleGameWin());
        yield take(LIFECYCLE_GAME_NEXT_LEVEL);
        yield put(gameLoadLevel(getLevel(yield select(getCurrentLevel)), difficulty));
        yield put(gameStart());
      }
    }
    yield put(lifecycleMainMenu());
  }
}

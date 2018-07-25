// @flow
import { cancel, cancelled, fork, take, call, all, put, select, takeEvery } from 'redux-saga/effects';
import { type Saga, delay } from 'redux-saga';
import { LIFECYCLE_GAME_START, GAME_UI_ATOM_MOVE_END, GAME_LEVEL_LOSE, GAME_LEVEL_WIN } from '../actionTypes';
import { type ReduxState } from '../initialState';
import { gameLevelWin, clockTick, gameLevelLose } from '../actions/game';
import isMoleculeComplete from '../../selectors/isMoleculeComplete';

function* evaluateAfterMove(): Saga<void> {
  const { game: { board: { atoms, goalMolecule } } } = yield select();
  const complete = isMoleculeComplete({ atoms, goalMolecule });
  if (complete) {
    yield put(gameLevelWin());
  }
}

const getTimeLeft = ({ game: { player: { timeLeft } } }: ReduxState): number => timeLeft;

function* tickClock(): Saga<void> {
  yield put(clockTick());
  const timeLeft: number = yield select(getTimeLeft);
  if (timeLeft === 0) {
    yield put(gameLevelLose());
  } else {
    yield call(delay, 1000);
  }
}

function* cycleClock(): Saga<void> {
  while (true) {
    if (yield cancelled()) {
      break;
    }
    yield call(tickClock);
  }
}

function* runClock(): Saga<void> {
  while (true) {
    yield take(LIFECYCLE_GAME_START);
    const cycleClockTask = yield fork(cycleClock);
    yield take([GAME_LEVEL_WIN, GAME_LEVEL_LOSE]);
    yield cancel(cycleClockTask);
  }
}

function* gameUiSaga(): Saga<void> {
  yield all([
    takeEvery(GAME_UI_ATOM_MOVE_END, evaluateAfterMove),
    call(runClock),
  ]);
}

export default gameUiSaga;

// @flow
import { type Saga } from 'redux-saga';
import { all, call } from 'redux-saga/effects';
import lifecycleSaga from './lifecycle';
import gameUiSaga from './gameUi';

export function* rootSaga(): Saga<void> {
  yield all([
    call(lifecycleSaga),
    call(gameUiSaga),
  ]);
}

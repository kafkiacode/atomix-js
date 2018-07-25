// @flow
import { combineReducers } from 'redux';
import lifecycle from './reducers/lifecycle';
import settings from './reducers/settings';
import game from './reducers/game';

const rootReducer = combineReducers({
  lifecycle,
  settings,
  game,
});

export default rootReducer;

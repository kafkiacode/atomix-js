// @flow
import { combineReducers } from 'redux';

import board from './game/board';
import player from './game/player';
import ui from './game/ui';

export default combineReducers({
  board,
  player,
  ui,
});

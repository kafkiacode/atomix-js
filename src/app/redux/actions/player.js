// @flow
import { createAction } from 'redux-actions';
import * as types from '../actionTypes';

export const clockTick = createAction(types.CLOCK_TICK, (): void => undefined);

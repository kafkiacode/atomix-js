// @flow
import * as actionTypes from '../../redux/actionTypes';

type ValidActionType = $Keys<typeof actionTypes>;
type Action = {
  type: ValidActionType,
};

export type { ValidActionType };
export type { Action };

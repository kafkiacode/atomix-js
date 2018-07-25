// @flow
import {
  screenIds,
  difficulties,
} from '../enums/general';

export type ScreenId = $Keys<typeof screenIds>;
export type Difficulty = $Keys<typeof difficulties>;

// @flow
import React from 'react';

export const getGameBackgroundDecorator =
  ({ size = 1, width, height }: { size?: number, width?: number, height?: number } = {}) =>
    (story: *) => (
      <div style={{
        width: `${width != null ? width : size}in`,
        height: `${height != null ? height : size}in`,
        border: '5px solid lime',
        backgroundColor: '#392900',
        position: 'relative',
      }}
      >
        {story()}
      </div>);

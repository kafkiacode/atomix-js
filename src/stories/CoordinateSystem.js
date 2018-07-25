/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import CoordinateSystem from '../app/elements/CoordinateSystem';

const style = {
  backgroundColor: 'purple',
  width: '1in',
  height: '1in',
  position: 'absolute',
};

export default () => {
  storiesOf('CoordinateSystem', module)
    .add('Default', () => (
      <div style={{
        border: '1px solid lime',
        width: '90vmin',
        height: '90vmin',
        margin: '5px auto',
      }}
      >
        <CoordinateSystem width="3" height="3" style={{ width: '100%', height: '100%' }}>
          <div>
            <div style={{ ...style, left: '0in', top: '0in' }} />
            <div style={{ ...style, left: '1in', top: '1in' }} />
            <div style={{ ...style, left: '2in', top: '2in' }} />
          </div>
        </CoordinateSystem>
      </div>));
};

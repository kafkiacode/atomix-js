// @flow
import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  brick: {
    width: '1in',
    height: '1in',
    cursor: 'default',
    display: 'inline-block',
    position: 'relative',
    boxSizing: 'border-box',
  },
  level2_1: {
    // height: '100%',
    borderBottom: 'calc(1in / 16) solid #2E0606',
    borderRight: 'calc(1in / 16) solid #2E0606',
    position: 'relative',
  },
  level2_2: {
    boxSizing: 'border-box',
    height: '100%',
    borderStyle: 'solid',
    borderWidth: 'calc(1in / 16 * 4)',
    borderTopColor: '#EFEFEF',
    borderRightColor: '#393939',
    borderBottomColor: '#6B6B6B',
    borderLeftColor: '#ADADAD',
  },
  level2_3: {
    boxSizing: 'border-box',
    height: '100%',
    borderStyle: 'solid',
    borderWidth: 'calc(1in / 16)',
    borderTopColor: '#393939',
    borderRightColor: '#EFEFEF',
    borderBottomColor: '#EFEFEF',
    borderLeftColor: '#393939',
    backgroundColor: '#ADADAD',
  },
});

const Brick = ({ style, x, y }: {style?: {}, x?: number, y?: number }) => (
  <div
    className={css(styles.brick, styles.level2_1)}
    style={{
      ...(
        (x !== undefined && y !== undefined)
          ? { position: 'absolute', left: `${x}in`, top: `${y}in` }
          : {}
      ),
      ...style,
    }}
  >
    <div className={css(styles.level2_2)}>
      <div className={css(styles.level2_3)} />
    </div>
  </div>);

Brick.defaultProps = { style: {}, x: undefined, y: undefined };

export default Brick;

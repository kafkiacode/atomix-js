// @flow
import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  floor: {
    width: '1in',
    height: '1in',
    cursor: 'default',
    display: 'inline-block',
    position: 'relative',
    boxSizing: 'border-box',
    backgroundColor: '#392900',
  },
});


const Floor = ({ style, x, y }: {style?: {}, x?: number, y?: number }) =>
  (<div
    className={css(styles.floor)}
    style={{
      ...(
        (x !== undefined && y !== undefined)
          ? { position: 'absolute', left: `${x}in`, top: `${y}in` }
          : {}
      ),
      ...style,
    }}
  />);

Floor.defaultProps = { style: {}, x: undefined, y: undefined };

export default Floor;

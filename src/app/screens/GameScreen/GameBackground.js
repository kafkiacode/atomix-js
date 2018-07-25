// @flow
import React, { Component } from 'react';
// import range from 'lodash/fp/range';
import random from 'lodash/fp/random';
// import flattenDeep from 'lodash/fp/flattenDeep';
import { StyleSheet, css } from 'aphrodite/no-important';
import NeonBar, { height as neonBarSquareSize, multiplier } from '../../elements/decoration/NeonBar';

const getNeonBarsData = (width: number, height: number): Array<{
  x: number,
  y: number,
  w: number,
  style: {},
  key: string,
}> => {
  if (width < 1 || height < 1) {
    return [];
  }
  // constants
  const barsPerGroup = 7;
  const maxBarWidth = 25;
  const minBarWidth = 10;
  const groupPadding = 0.2;
  const groupSetPadding = 2;

  // calculated
  const heightInSquares = (height * 2.5) / (neonBarSquareSize * multiplier);
  const widthInSquares = (width * 2.5) / (neonBarSquareSize * multiplier);
  const barMiddleIndex = Math.floor(barsPerGroup / 2);
  const segmentVariation = (maxBarWidth - minBarWidth) / Math.ceil(barsPerGroup / 2);
  const groupsetsCount = Math.floor(heightInSquares / (barsPerGroup + groupSetPadding));
  const groupsCount = Math.floor(widthInSquares / (maxBarWidth * (1 + groupPadding)));
  const stylesSource = {};
  for (let barSize = 0; barSize <= barMiddleIndex; barSize++) {
    const percentage = 20 + ((barMiddleIndex - barSize) * (70 / barMiddleIndex));
    stylesSource[`barSize${barSize}`] = {
      animationName: [{
        '0%': {
          transform: `translateX(${percentage}%)`,
        },
        '50%': {
          transform: `translateX(-${percentage}%)`,
        },
        '100%': {
          transform: `translateX(${percentage}%)`,
        },

      }],
    };
  }
  const styles = StyleSheet.create(stylesSource);
  const list = [];
  for (let groupSetIdx = 0; groupSetIdx < groupsetsCount; groupSetIdx++) {
    const groupSetDeltaY = groupSetIdx * (barsPerGroup + groupSetPadding);
    const groupSetDeltaX = random(maxBarWidth * (1 + groupPadding) * -0.8, maxBarWidth * (1 + groupPadding) * 0.8);
    for (let groupIdx = 0; groupIdx < groupsCount; groupIdx++) {
      const groupDeltaX = (groupIdx * (maxBarWidth * (1 + groupPadding)));
      for (let barIdx = 0; barIdx < barsPerGroup; barIdx++) {
        const distanceFromCenter = Math.abs(barMiddleIndex - barIdx);
        const distanceFromExtremeBar = barMiddleIndex - distanceFromCenter;
        const randomVariation1 = random(0, segmentVariation);
        const randomVariation2 = random(0, segmentVariation);
        list.push({
          x: groupSetDeltaX
            + groupDeltaX
            + ((segmentVariation * distanceFromCenter) / 2)
            + Math.min(randomVariation1, randomVariation2),
          y: groupSetDeltaY + barIdx,
          w: minBarWidth + (segmentVariation * distanceFromExtremeBar) + Math.max(randomVariation1, randomVariation2),
          style: styles[`barSize${distanceFromExtremeBar}`],
          key: `gs${groupSetIdx}_g${groupIdx}_b${barIdx}`,
        });
      }
    }
  }
  return list;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'absolute',
  },
  inner: {
    transform: 'rotate(-45deg) scale(1.6)',
    transformOrigin: '50% 50%',
    position: 'absolute',
    width: '150%',
    height: '150%',
    top: '-25%',
    left: '-25%',
  },
});

class GameBackground extends Component<{}, {
  isMounted: boolean,
  width: number,
  height: number,
}> {
  state = {
    isMounted: false,
    width: 0,
    height: 0,
  };
  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      isMounted: true,
      width: document.body ? document.body.clientWidth : 0,
      height: document.body ? document.body.clientHeight : 0,
    });
  }
  shouldComponentUpdate(_: {}, { isMounted }: { isMounted: boolean }) {
    return isMounted && !this.state.isMounted;
  }
  render() {
    return (
      <div className={css(styles.container)}>
        <div className={css(styles.inner)}>
          {this.state.isMounted && getNeonBarsData(this.state.width, this.state.height)
            .map(({
              x, y, w, style, key,
            }) => (
              <NeonBar
                key={key}
                length={w * neonBarSquareSize}
                style={{
                  top: y * neonBarSquareSize * multiplier,
                  left: x * neonBarSquareSize * multiplier,
                  position: 'absolute',
                }}
                styles={[style]}
              />))}
        </div>
      </div>);
  }
}

export default GameBackground;

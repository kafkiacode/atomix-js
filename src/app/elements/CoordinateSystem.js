// @flow
import React, { type Node } from 'react';
import { compose, mapProps } from 'recompose';
import { withContentRect } from 'react-measure';


// const convertToPx = (unit: string) => ({
//   in: inches => inches * 96,
// }: {
//   [string]: (inches: number) => number
// })[unit];

const convertFromPx = (unit: string) => ({
  in: pixels => pixels / 96,
}: {
  [string]: (inches: number) => number
})[unit];

type propTypes = {
  width: number,
  height: number,
  unit: 'in',
  style: {},
  innerStyle: {},
  passedChildren: Node,
  measureRef: *,
  contentRect: {
    bounds: {
      width: number,
      height: number,
    },
  },
};

const CoordinateSystem = ({
  width,
  height,
  unit = 'in',
  style,
  innerStyle,
  passedChildren,
  contentRect: { bounds },
  measureRef,
}: propTypes) => {
  const dimension = (bounds.width / bounds.height >= width / height)
    ? 'height'
    : 'width';
  const dimensions = { height, width };
  return (
    <div ref={measureRef} style={{ position: 'relative', ...style }}>
      <div
        style={{
          width: `${width}${unit}`,
          height: `${height}${unit}`,
          transform: `scale(${convertFromPx(unit)(bounds[dimension]) / dimensions[dimension]})`,
          transformOrigin: 'top left',
          ...innerStyle,
        }}
      >
        {
          passedChildren
        }
      </div>
    </div>);
};

export default compose(
  mapProps(({ children, ...props }: { [any]: any }) => ({ ...props, passedChildren: children })),
  withContentRect('bounds')
)(CoordinateSystem);

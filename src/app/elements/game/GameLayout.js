// @flow
import React, { type Element } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Board from '../../screens/GameScreen/Board';
import MoleculeShowcase from '../../screens/GameScreen/MoleculeShowcase';
import StateIndicator from '../StateIndicator';

const ratios = {
  landscape: {
    w: 1,
    h: 0.5,
  },
  portrait: {
    w: 0.5,
    h: 1,
  },
};

const styles = StyleSheet.create({
  gameLayout: {
    boxSizing: 'border-box',
    // backgroundColor: 'rgba(255, 255, 255, 0.3)',
    display: 'grid',
    padding: '5px',
    // border: '5px dashed lime',
    '@media (orientation: landscape)': {
      width: `${ratios.landscape.w * 100}vmax`,
      maxWidth: `${100 / ratios.landscape.h}vmin`,
      height: `${ratios.landscape.h * 100}vmax`,
      maxHeight: '100vmin',
      gridColumnGap: 30,
      gridRowGap: 30,
      gridTemplateColumns: `1fr 1fr ${ratios.landscape.h * 100}%`,
      gridTemplateRows: '1fr 1fr 1fr 2fr',
      gridTemplateAreas: `
        "title title board"
        ". . board"
        ". . board"
        "showcase showcase board"
        `,
    },
    '@media (orientation: portrait)': {
      width: `${ratios.portrait.w * 100}vmax`,
      maxWidth: '100vmin',
      height: `${ratios.portrait.h * 100}vmax`,
      maxHeight: `${100 / ratios.portrait.w}vmin`,
      gridTemplateColumns: '2fr 1fr',
      gridTemplateRows: `1fr 1fr 1fr 1fr ${ratios.portrait.w * 100}%`,
      gridTemplateAreas: `
        "title ."
        "showcase ."
        "showcase ."
        "showcase ."
        "board board"
        `,
    },
  },
  board: {
    // border: '2px dashed yellow',
    gridArea: 'board',
    position: 'relative',
  },
  title: {
    gridArea: 'title',
    color: '#fff',
    fontFamily: ['"Press Start 2P"', 'Courier new', 'monospace', 'sans-serif'],
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  control: {
    boxSizing: 'border-box',
    // border: '2px dashed lightblue',
  },
  moleculeShowcase: {
    boxSizing: 'border-box',
    // border: '2px dashed red',
    gridArea: 'showcase',
  },
});

const GameLayout = ({
  controls,
  board,
  moleculeShowcase,
  style = {},
}: {
  controls: Array<Element<typeof StateIndicator>>,
  board: Element<typeof Board>,
  moleculeShowcase: Element<typeof MoleculeShowcase>,
  style?: {},
}) => (
  <div className={css(styles.gameLayout)} style={style}>
    {/* eslint-disable-next-line react/no-array-index-key */}
    {controls.slice(0, 4).map((controlEl, idx) => <div key={idx} className={css(styles.control)}>{controlEl}</div>)}
    <div className={css(styles.moleculeShowcase)}>{moleculeShowcase}</div>
    <div className={css(styles.board)}>{board}</div>
    <div className={css(styles.title)}>Atomix-js</div>
  </div>
);

GameLayout.defaultProps = { style: undefined };

export default GameLayout;

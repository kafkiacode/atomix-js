// @flow
/* eslint-disable react/sort-comp */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { boardTiles } from '../../../enums/game';
import initialState from '../../../redux/initialState';
import Brick from '../../../elements/game/Brick';
import Floor from '../../../elements/game/Floor';

const BoardStaticElements = ({ cellsMatrix }: {
  cellsMatrix: typeof initialState.game.board.cellsMatrix,
}) => (
  <Fragment>{
    cellsMatrix.map((matrixRow, rowIdx) => matrixRow.map((boardTile, colIdx) => {
      const key = `${rowIdx}_${colIdx}`;
      switch (boardTile) {
        case boardTiles.WALL_EXTERNAL:
        case boardTiles.WALL_INTERNAL:
          return <Brick key={key} x={colIdx} y={rowIdx} />;
        case boardTiles.FLOOR:
          return <Floor key={key} x={colIdx} y={rowIdx} />;
        case boardTiles.EMPTY:
        default:
          return null;
      }
    }))
  }
  </Fragment>
);

const enhance = connect(state => ({ cellsMatrix: state.game.board.cellsMatrix }));

export { BoardStaticElements as PresentationalBoardStaticElements };
export default enhance(BoardStaticElements);

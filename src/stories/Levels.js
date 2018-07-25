// @flow
/* global module */
import React from 'react';
// import { StyleSheet, css } from 'aphrodite/no-important';
import { storiesOf } from '@storybook/react';
import getLevel, { totalLevels } from '../app/selectors/getLevel';
import { PresentationalMoleculeShowcase } from '../app/screens/GameScreen/MoleculeShowcase';
import CoordinateSystem from '../app/elements/CoordinateSystem';
// import { PresentationalBoard } from '../app/screens/GameScreen/Board';
// import { gameStages } from '../app/enums/game';
import { PresentationalBoardStaticElements } from '../app/screens/GameScreen/Board/BoardStaticElements';
import { PresentationalAtomsCollection } from '../app/screens/GameScreen/Board/AtomsCollection';

export default () => {
  for (let i = 0; i < totalLevels; i++) {
    /* eslint-disable no-loop-func */
    const level = getLevel(i + 1);
    storiesOf('Levels', module)
      // eslint-disable-next-line arrow-body-style
      .add(`Level ${i + 1} ${level.goalMolecule.name}`, () => {
        return (
          <div style={{
            width: '75%', height: '75%', display: 'flex', flex: '1 0 0',
          }}
          >
            <div><PresentationalMoleculeShowcase goalMolecule={level.goalMolecule} atoms={level.atoms} scale={30} /></div>
            <div style={{
              position: 'relative', height: '100%', width: '80%', flex: '1 0 0',
            }}
            >
              <div style={{
                position: 'relative', height: '100%', width: '100%',
              }}
              >
                <CoordinateSystem
                  style={{ width: '100%', height: '100%' }}
                  width={level.cellsMatrix[0].length}
                  height={level.cellsMatrix.length}
                >
                  <PresentationalBoardStaticElements cellsMatrix={level.cellsMatrix} />
                  <PresentationalAtomsCollection
                    width={0}
                    height={0}
                    left={0}
                    top={0}
                    atoms={level.atoms}
                    touchingAtomIdx={null}
                    movingAtomIdx={null}
                    gameUiAtomMoveEnd={() => undefined}
                    onAtomTouchDown={() => undefined}
                  />
                </CoordinateSystem>
              </div>
            </div>
          </div>
        );
      });
  }
};


/* <PresentationalBoard
updateScale={() => undefined}
gameUiTouch={() => ({})}
gameUiTouchRelease={() => ({})}
gameUiAtomMoveEnd={() => ({})}
scale={10}
stage={gameStages.PLAYING}
touchingAtomIdx={false}
atomIdx={null}
measureRef={() => undefined}
leaningDir={null}
onNextStage={() => undefined}
contentRect={{
  bounds: {
    width: 300, height: 300, top: 0, left: 0,
  },
}}
cellsHeight={level.cellsMatrix.length}
cellsWidth={level.cellsMatrix[0].length}
/> */

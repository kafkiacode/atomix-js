// @flow
/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import OverlayScreen from '../app/screens/GameScreen/OverlayScreen';
import { PresentationalMoleculeShowcase } from '../app/screens/GameScreen/MoleculeShowcase';
import { gameStages } from '../app/enums/game';
import getLevel from '../app/selectors/getLevel';

export default () => {
  storiesOf('OverlayScreen', module)
    .add('Default', () => (
      <OverlayScreen stage={gameStages.READY} onExit={() => undefined} />
    ));
  storiesOf('MoleculeShowcase', module)
    .add('Water', () => {
      const level = getLevel(1);
      return <PresentationalMoleculeShowcase scale={30} atoms={level.atoms} goalMolecule={level.goalMolecule} />;
    })
    .add('M', () => {
      const level = getLevel(3);
      return <PresentationalMoleculeShowcase scale={30} atoms={level.atoms} goalMolecule={level.goalMolecule} />;
    });
};

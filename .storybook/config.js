import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
setOptions({
  name: 'Atomix-js Storybook',
});

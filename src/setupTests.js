/* global process */
// Uncomment this when testing with enzyme
// See https://github.com/Khan/aphrodite/issues/62
// import Enzyme from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import * as Aphrodite from 'aphrodite/no-important';
// import * as AphroditeNoImportant from 'aphrodite/no-important';

// Aphrodite.StyleSheetTestUtils.suppressStyleInjection();
// AphroditeNoImportant.StyleSheetTestUtils.suppressStyleInjection();

// Enzyme.configure({ adapter: new Adapter() });

import { StyleSheetTestUtils } from 'aphrodite/no-important';

afterEach(() => new Promise((resolve) => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  return process.nextTick(resolve);
}));

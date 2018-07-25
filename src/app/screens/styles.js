// @flow
import { StyleSheet } from 'aphrodite/no-important';

export const Screen = StyleSheet.create({
  screen: {
    fontFamily: ['"Press Start 2P"', 'Courier new', 'monospace', 'sans-serif'],
    background: '#000',
    position: 'fixed',
    width: '100%',
    height: '100%',
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

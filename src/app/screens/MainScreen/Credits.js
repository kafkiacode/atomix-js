// @flow
import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  credit: {
    fontSize: '0.8em',
  },
});

const Credits = () => (
  <div className={css(styles.credit)}>
    <p>ReactJS version by <a href="https://gabrielmerida.cl" target="_blank" rel="noopener noreferrer">Gabriel Mérida</a> <a href="https://github.com/kafkiacode/atomix-js" target="_blank" rel="noopener noreferrer">(source)</a></p>
    <p>(c) 1990 THALION SOFTWARE</p>
    <p>Idea and concept by <a href="https://en.wikipedia.org/wiki/Atomix_(video_game)" target="_blank" rel="noopener noreferrer">SOFTTOUCH</a></p>
  </div>
);

export default Credits;

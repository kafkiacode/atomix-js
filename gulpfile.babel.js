import gulp from 'gulp';
import buildLevels from './src/build/buildLevels';

gulp.task('build-levels', () => {
  buildLevels();
});

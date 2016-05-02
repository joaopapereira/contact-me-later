var gulp = require('gulp'),
    info = require('./src/package.json'),
    childProcess  = require('child_process'),
    electron      = require('electron-prebuilt');

// create the gulp task
gulp.task('run', function () {
  childProcess.spawn(electron, ['./src'], { stdio: 'inherit' });
});

'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')({
  scope: ['dependencies', 'devDependencies'],
  pattern: 'gulp-*',
  replaceString: /\bgulp[\-.]/
});
const electron = require('electron-connect').server.create();

gulp.task('serve', function() {
  electron.start();
  gulp.watch(['./**/**/*.js'], electron.restart);
  gulp.watch(['./assets/styl/*.styl'], ['css', electron.reload]);
});

gulp.task('stylus', function() {
  return gulp.src('./assets/styl/*.styl')
    .pipe($.stylus({compress: false}))
    .pipe(gulp.dest('./bundle/css'));
});

gulp.task('css:min', function() {
  return gulp.src('./bundle/css/dest/style.css')
    .pipe($.cssmin())
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest('./bundle/css/min'));
});

gulp.task('css:concat', function() {
  return gulp.src('./bundle/css/*.css')
    .pipe($.concatCss('style.css'))
    .pipe(gulp.dest('./bundle/css/dest'));
});

gulp.task('css', ['stylus', 'css:concat']);

gulp.task('default', ['css', 'serve']);

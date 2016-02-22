'use babel';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')({
  scope: ['dependencies', 'devDependencies'],
  pattern: 'gulp-*',
  replaceString: /\bgulp[\-.]/
});
const electron = require('electron-connect').server.create();

gulp.task('serve', function() {
  electron.start();
  gulp.watch(['./app/**/**/*.js'], electron.reload);
});

gulp.task('js:lint', function() {
  return gulp.src(['./app/**/**/*.js', '!node_modules/**'])
    .pipe($.eslint())
    .pipe($.eslint.format('stylish'))
    .pipe($.eslint.failAfterError());
});

gulp.task('js', []);

gulp.task('css:compile', function() {
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

gulp.task('css:lint', function() {
  return gulp.src('./actions/styl/*.styl')
    .pipe($.stylint());
});

gulp.task('css:concat', function() {
  return gulp.src('./bundle/css/*.css')
    .pipe($.concatCss('style.css'))
    .pipe(gulp.dest('./bundle/css/dest'));
});

gulp.task('css', ['css:compile', 'css:concat', 'css:min']);

gulp.task('default', ['serve']);

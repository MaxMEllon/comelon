'use babel';

const gulp = require('gulp');
const runSequence = require('run-sequence');
const $ = require('gulp-load-plugins')({
  scope: ['dependencies', 'devDependencies'],
  pattern: 'gulp-*',
  replaceString: /\bgulp[\-.]/
});
const electron = require('electron-connect').server.create();

gulp.task('serve', function() {
  electron.start();
  gulp.watch(['./app/**/*.js'], ['js', electron.restart]);
});

gulp.task('js:lint', function() {
  return gulp.src(['./app/**/**/*.js'])
    .pipe($.eslint())
    .pipe($.eslint.format('stylish'))
    .pipe($.eslint.failAfterError());
});

gulp.task('js:compile', function() {
  return gulp.src('')
    .pipe($.webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./bundle/js'));
});

gulp.task('js:uglify', function() {
  return gulp.src('./bundle/js/main.js')
    .pipe($.uglify())
    .pipe($.rename('main.min.js'))
    .pipe(gulp.dest('./bundle/js'));
});

gulp.task('js', function(callback) {
  return runSequence(
    ['js:compile', 'js:lint'],
    'js:uglify',
    callback
  );
});

gulp.task('watch:js', function() {
  gulp.watch('./app/**/*.js', ['js']);
});

gulp.task('css:compile', function() {
  return gulp.src('./assets/styl/*.styl')
    .pipe($.stylus({compress: false}))
    .pipe(gulp.dest('./bundle/css'));
});

gulp.task('css:min', function() {
  return gulp.src('./bundle/css/dist/style.css')
    .pipe($.cssmin())
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest('./bundle/css/min'));
});

gulp.task('css:lint', function() {
  return gulp.src('./assets/styl/*.styl')
    .pipe($.stylint());
});

gulp.task('css:concat', function() {
  return gulp.src('./bundle/css/*.css')
    .pipe($.concatCss('style.css'))
    .pipe(gulp.dest('./bundle/css/dist'));
});

gulp.task('css', function(callback) {
  return runSequence(
    ['css:compile', 'css:lint'],
    'css:concat',
    'css:min',
    callback
  );
});

gulp.task('watch:css', function() {
  gulp.watch('./assets/styl/*.styl', ['css']);
});

gulp.task('watch', ['watch:js', 'watch:css']);

gulp.task('default', ['serve']);

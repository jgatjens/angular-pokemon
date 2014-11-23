// 'use strict';

var gulp = require('gulp');

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('app/styles/*.scss')
    .pipe(wiredep({
        directory: 'app/bower_components'
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      directory: 'app/bower_components',
      exclude: ['bootstrap-sass-official']
    }))
    .pipe(gulp.dest('app'));

});


// Inject js files into index.html
var angularFilesort = require('gulp-angular-filesort'),
    es = require('event-stream'),
    inject = require('gulp-inject');

var options = {
  transform: function (filepath) {
    return '<script src="' + filepath.slice(5) + '"></script>';
  }
};

gulp.task('injectjs', function () {

  var target = gulp.src('./app/index.html');
  var sources = gulp.src([
    './app/pages/**/*.js',
    './app/common/**/*.js',
    '!./app/common/config.js' // exclude this file
  ]).pipe(angularFilesort());

  return target
            .pipe(inject(sources, options))
            .pipe(gulp.dest('./app'));
});

gulp.task('injectscss', function () {

  var target = gulp.src('./app/styles/main.scss');
  var sources = gulp.src(['./app/pages/**/*.scss', './app/common/**/*.scss']);

  return target.pipe(inject(sources, {
    starttag: '// inject:{{ext}}',
    endtag: '// endinject',
    transform: function (filepath) {
      return '@import "..' + filepath.replace('_','').slice(4) + '";';
    }
  }))
  .pipe(gulp.dest('./app/styles'));


});

// gulp.task('inject', ['injectjs', 'injectscss']);


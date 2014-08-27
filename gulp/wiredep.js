'use strict';

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


// Inject angular modulos into index.html
var angularFilesort = require('gulp-angular-filesort'),
    inject = require('gulp-inject');

gulp.task('injectjs', function () {
  var target = gulp.src('app/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:

  var sources = gulp.src(['app/pages/**/*.js']).pipe(angularFilesort());


  return target.pipe(inject(sources, {
        transform: function (filepath) {
          return '<script src="' + filepath.slice(5) + '"></script>';
        }
      }
    ))
    .pipe(gulp.dest('./app'));

});

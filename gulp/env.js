var gulp = require('gulp');

// var env = process.env.NODE_ENV || 'DEVELOPMENT';
var preprocess = require('gulp-preprocess');

gulp.task('env_dev', function() {
  gulp.src('./app/common/config.js')
    .pipe(preprocess({context: { NODE_ENV: 'DEVELOPMENT'}}))
    .pipe(gulp.dest('./app/scripts/'));
});

gulp.task('env_prod', function() {
  gulp.src('./app/common/config.js')
    .pipe(preprocess({context: { NODE_ENV: 'PRODUCTION'}}))
    .pipe(gulp.dest('./app/scripts/'));
});

'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license']
});

function handleError(err) {
  console.error(err.toString());
  this.emit('end');
}

gulp.task('styles', function () {
  return gulp.src('app/styles/*.scss')
    // .pipe($.plumber())
    // .pipe($.rubySass({style: 'expanded'}))
    .pipe($.sass({style: 'expanded'}))
    .on('error', handleError)
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe($.size());
});

gulp.task('scripts', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.size());
});


function moduleName (file) {
    var array = file.relative.split('/');
    // console.log('pathname', file.relative, array);
    var path = array.slice(0, array.length - 1);
    // console.log('ngVet.' + path.join('.'));
    return 'ngVet.' + path.join('.');
}

// add
gulp.task('pages', function () {
  return gulp.src(('app/pages/**/*.tpl.html'))
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.ngHtml2js({
      moduleName: moduleName,
      prefix: 'pages/'
    }))
    .pipe(gulp.dest('.tmp/partials'))
    .pipe($.size());
});

gulp.task('common', function () {
  return gulp.src(('app/common/**/*.tpl.html'))
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.ngHtml2js({
      moduleName: function moduleName (file) {
          var array = file.relative.split('/');
          var path = array.slice(0, array.length - 1);
          return 'ngVet.common.' + path.join('.');
      },
      prefix: 'common/'
    }))
    .pipe(gulp.dest('.tmp/partials'))
    .pipe($.size());
});

gulp.task('partials', ['pages', 'common']);


gulp.task('html', ['styles', 'scripts', 'partials'], function () {
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');

  return gulp.src('app/*.html')
    .pipe($.inject(gulp.src('.tmp/partials/**/*.js'), {
      read: false,
      starttag: '<!-- inject:partials -->',
      addRootSlash: false,
      addPrefix: '../'
    }))
    // .pipe($.debug({verbose: true, title: "test"}))
    .pipe($.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify({preserveComments: $.uglifySaveLicense}))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.replace('bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap','assets/fonts'))
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe($.useref.restore())

    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

gulp.task('images', function () {
  return gulp.src('app/assets/images/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/assets/images'))
    .pipe($.size());
});

gulp.task('fonts', function () {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/assets/fonts'))
    .pipe($.size());
});

gulp.task('clean', function () {
  return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.rimraf());
});

gulp.task('build', ['html', 'partials', 'images', 'fonts']);

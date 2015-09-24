'use strict';

var gulp = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var tslint = require('gulp-tslint');

gulp.task('default', ['build']);

gulp.task('build', ['clean', 'compile', 'html']);

gulp.task('clean', function () {
  del.sync([
    'output/**/*',
    'output'
  ]);
});

gulp.task('html', function () {
  return gulp.src('source/**/*.html', { base: 'source' })
    .pipe(gulp.dest('output/'));
});

gulp.task('lint', function() {
  return gulp.src('source/ts/**/*.ts')
    .pipe(
      tslint({
        configuration: "tslint.json"
      })
    )
    .pipe(tslint.report("verbose"))
    .on('error', function handleError(err) {
      this.emit('end');
    });
});

gulp.task('compile', ['lint'], function (done) {
  
  var tsProject = ts.createProject('tsconfig.json', {
    typescript: require('typescript')
  });
  
  var tsResult = tsProject.src()
    .pipe(sourcemaps.init({debug: true}))
    .pipe(ts(tsProject));

  // the files are being renamed here so as not to go to
  // ./output/js/source/ts but straight into ./output/js/
  // preserving the original directory structure otherwise
  return tsResult.js
    .pipe(rename(function (path) {
      path.dirname = path.dirname.replace('source/ts', 'js');
    }))
    .pipe(sourcemaps.write({sourceRoot: '/'}))
    .pipe(gulp.dest('output'));
  
});

gulp.task('serve', ['build'], function () {

  browserSync.init({
    server: {
      baseDir: ['output'],
      routes: {
        "/node_modules": "node_modules"
      }
    },
    files: ['output/**/*'],
    port: 8080,
    open: false
  });

  gulp.watch('source/ts/**/*.ts', ['compile']);
  gulp.watch('source/ts/**/*.html', ['html']);
  
});


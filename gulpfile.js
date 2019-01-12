// Gulpfile.js

'use strict';

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  minifyCSS = require('gulp-minify-css'),
  path = require('path'),
  notify = require('gulp-notify'),
  clean = require('gulp-clean'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify');

var sassSrc = 'src/scss/bootstrap-dialog.scss';
var cssDest = 'dist/css';

gulp.task('styles', function() {
    return gulp.src(sassSrc)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(cssDest))
      .pipe(rename('bootstrap-dialog.min.css'))
      .pipe(minifyCSS())
      .pipe(gulp.dest(cssDest));
});

gulp.task('lint', function() {
    return gulp.src(['src/js/bootstrap-dialog.js'])
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('js', function() {
    return gulp.src(['src/js/bootstrap-dialog.js'])
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('bootstrap-dialog.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('clean', function() {
    return gulp.src(['dist/*'], {
        read: false
    })
        .pipe(clean({allowEmpty: true}));
});

gulp.task('watch', function() {
    gulp.watch(['src/scss/*.scss', 'src/js/*.js'], gulp.parallel('styles', 'js'));
});

gulp.task('default', gulp.parallel('watch'));

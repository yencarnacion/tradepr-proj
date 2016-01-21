var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var lessify = require('lessify');
var source = require('vinyl-source-stream');

gulp.task('default', function () {
  return browserify('./source/app.js')
        .transform('lessify',{})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('tradepr.js'))
        .pipe(gulp.dest('./build/'));
});

'use strict';

//============ dependencies
let gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    minifyCSS    = require('gulp-clean-css'),
    rename       = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    notify       = require("gulp-notify");


//============ const
const sassSrc  = ['sass/**/*.sass'],
	    compileSass = 'compileSass',
      sassWatchSrc = 'sass/**/*.sass',
      sassDest = 'css';

//============ Compile SCSS
gulp.task(compileSass, function () {
     gulp.src(sassSrc)
    .pipe(sass({outputStyle: 'expand'}).on('error', notify.onError()))
    .pipe(minifyCSS())
    .pipe(autoprefixer(['last 3 versions']))
    .pipe(rename({suffix: 'Min'}))
    .pipe(gulp.dest(sassDest))
});


//============ detect changes in SASS
gulp.task('watch', [compileSass] , () => gulp.watch(sassWatchSrc, [compileSass]));

//============ Run TASKS
gulp.task('default', ['watch']);
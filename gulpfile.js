let		gulp           = require('gulp'),
    concat         = require('gulp-concat'),
    uglify         = require('gulp-uglify'),
    sass           = require('gulp-sass'),
    autoPreFixer   = require('gulp-autoprefixer'),
    rename         = require('gulp-rename'),
    notify         = require("gulp-notify"),
    minifyCSS      = require('gulp-clean-css'),
    browserSync    = require('browser-sync'),
    del            = require('del');



const jsLibsDist = [
        'app/libs/jquery-3.2.1.min.js',
        'app/libs/formstyler/jquery.formstyler.min.js'
    ],
    appJsDist = 'app/js',
    srcMain = 'app/styles/sass/**/*.sass';


gulp.task('common-js', function() {
    return gulp.src(['app/js/common.js']).pipe(gulp.dest(appJsDist));
});

gulp.task('js', function() {
    return gulp.src(jsLibsDist)
        .pipe(concat('scripts.min.js'))
        .pipe(uglify()) // Минимизировать весь js (на выбор)
        .pipe(gulp.dest(appJsDist))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('sass', function() {
    return gulp.src([srcMain])
        .pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
        .pipe(rename({suffix: 'Min', prefix : ''}))
        .pipe(autoPreFixer(['last 3 versions']))
        .pipe(minifyCSS())
        .pipe(gulp.dest('app/styles/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
    gulp.watch(srcMain, ['sass']);
    gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
    gulp.watch('app/*.html', browserSync.reload);
});


gulp.task('build', ['removeDist', 'sass', 'js'], function() {
    let buildFiles = gulp.src(['app/**/*']).pipe(gulp.dest('dist'));
});

gulp.task('removeDist', function() { return del.sync('dist'); });

gulp.task('default', ['watch']);
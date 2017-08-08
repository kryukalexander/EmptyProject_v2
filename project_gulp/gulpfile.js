'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');

//Setup
const autoprefixerSettings = ['last 25 versions', '> 1%', 'ie 8', 'ie 7'];
const root = 'src/';
const dirs = {
    scss: root + 'scss/**/*.scss',
    css: root + 'css/',
    html: root + 'templates/*.html'
};

//CSS
gulp.task('dev:css', () => {
    gulp.src(dirs.scss)
    .pipe(sass.sync().on('error',  sass.logError))
    .pipe(autoprefixer(autoprefixerSettings, {cascade: true}))
    .pipe(cssnano())
    .pipe(gulp.dest(dirs.css));
});


//Browser sync
gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: './'

            //for all directory view
            , directory: true
        },

        notify: false
    });
});

//Watch
gulp.task('watch', ['dev:css', 'browser-sync'], () => {
    gulp.watch(dirs.scss, ['dev:css']);
    gulp.watch(dirs.css + '*.css', browserSync.reload);
    gulp.watch(dirs.html, browserSync.reload);
});
'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const watch = require('gulp-watch');


//CSS
gulp.task('dev:css', () => {
    gulp.src('src/scss/*.scss')
    .pipe(sass.sync().on('error',  sass.logError))
    .pipe(gulp.dest('./src/css/'));
});


//browser sync
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

gulp.task('watch', ['dev:css', 'browser-sync'], () => {
    gulp.watch('src/scss/**/*.scss', ['dev:css']);
    gulp.watch('src/css/style.css', browserSync.reload);
    gulp.watch('src/templates/*.html', browserSync.reload);
});
'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const preprocess = require('gulp-preprocess');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const del = require('del');

//Setup
const autoprefixerSettings = ['last 25 versions', '> 1%', 'ie 8', 'ie 7'];
const root = 'src/';
const dirs = {
    scss: root + 'scss/**/*.scss',
    css: root + 'css/',
    images: root + 'images/**/*',
    fonts: root + 'fonts/**/*',
    html: root + 'templates/*.html',
    htmlAll: root + 'templates/**/*.html',
    htmlDev: root + 'templates_build',
    build: {
        css: 'build/css/',
        html: 'build/templates_build/',
        images: 'build/images/',
        fonts: 'build/fonts/'
    }
};

//CSS
gulp.task('dev:css', () => {
    gulp.src(dirs.scss)
    .pipe(sass.sync().on('error',  sass.logError))
    .pipe(gulp.dest(dirs.css));
});

gulp.task('build:css', () => {
    gulp.src(dirs.scss)
        .pipe(sass.sync().on('error',  sass.logError))
        .pipe(autoprefixer(autoprefixerSettings, {cascade: true}))
        .pipe(cssnano())
        .pipe(gulp.dest(dirs.build.css));
});

//HTML
gulp.task('dev:html', () => {
    gulp.src(dirs.html)
        .pipe(preprocess())
        .pipe(gulp.dest('src/templates_build/'));
});

gulp.task('build:html', () => {
    gulp.src(dirs.html)
        .pipe(preprocess())
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cssnano()))
        .pipe(gulp.dest(dirs.build.html));
});

//Images
gulp.task('build:images', () => {
    gulp.src(dirs.images)

        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))

        .pipe(gulp.dest(dirs.build.images));
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
gulp.task('watch', ['dev:css', 'browser-sync', 'dev:html'], () => {
    gulp.watch(dirs.scss, ['dev:css']);
    gulp.watch(dirs.css + '*.css', browserSync.reload);
    gulp.watch(dirs.htmlAll, ['dev:html', browserSync.reload]);
});

//Clean
gulp.task('clean', () => {
    return del.sync('build/');
});

//Build
gulp.task('build:all', ['build:html', 'build:css', 'build:images'], () => {
    gulp.src(dirs.fonts).pipe(gulp.dest(dirs.build.fonts));
    gulp.src('src/index.html').pipe(gulp.dest('build/'))
});
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
const build = 'build/';

const dirs = {

    scss: {
        folder: root + 'scss/',
        all: root + 'scss/**/*.scss',
    },

    css: {
      dev:   root + 'css/',
      build: build + 'css/'
    },

    html: {
        root: root + 'templates/*.html',
        all: root + 'templates/**/*.html',
        dev: root + 'html/',
        build: build + 'html/',
    },

    js: {
        dev: root + 'js/*.js',
        build: build + 'js'
    },

    images: root + 'images/**/*',
    fonts: root + 'fonts/**/*',


    build: {
        images: build + 'images/',
        fonts: build + 'fonts/'
    }
};

//CSS
gulp.task('dev:css', () => {
    gulp.src(dirs.scss.all)
        .pipe(sass.sync().on('error',  sass.logError))
        .pipe(autoprefixer(autoprefixerSettings, {cascade: true}))
        .pipe(gulp.dest(dirs.css.dev));
});

gulp.task('build:css', () => {
    gulp.src(dirs.scss.all)
        .pipe(sass.sync().on('error',  sass.logError))
        .pipe(autoprefixer(autoprefixerSettings, {cascade: true}))
        .pipe(cssnano())
        .pipe(gulp.dest(dirs.css.build));
});

//HTML
gulp.task('dev:html', () => {
    gulp.src(dirs.html.root)
        .pipe(preprocess())
        .pipe(gulp.dest(dirs.html.dev));
});

gulp.task('build:html', () => {
    gulp.src(dirs.html.root)
        .pipe(preprocess())
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cssnano()))
        .pipe(gulp.dest(dirs.html.build));
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
gulp.task('watch', ['clean', 'dev:css', 'dev:html', 'browser-sync'], () => {
    gulp.watch(dirs.scss.all, ['dev:css', browserSync.reload]);
    gulp.watch(dirs.js.dev, browserSync.reload);
    gulp.watch(dirs.html.all, ['dev:html', browserSync.reload]);
});

//Clean
gulp.task('clean', () => {
    del.sync(build);
    del.sync(dirs.css.dev);
    del.sync(dirs.html.dev)
});

//Build
gulp.task('build:all', ['clean', 'build:html', 'build:css', 'build:images'], () => {
    gulp.src(dirs.fonts).pipe(gulp.dest(dirs.build.fonts));
    gulp.src('src/index.html').pipe(gulp.dest(build))
});
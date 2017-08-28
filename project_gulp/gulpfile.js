'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const browserSync = require('browser-sync');
const preprocess = require('gulp-preprocess');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const del = require('del');

//Setup
const ENV = process.env.npm_lifecycle_event;

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
gulp.task('css', () => {
    const out = ENV === 'build' ? dirs.css.build : dirs.css.dev;
    return gulp.src(dirs.scss.all)
        .pipe(sass.sync().on('error',  sass.logError))
        .pipe(postcss())
        .pipe(gulp.dest(out));
});

//HTML
gulp.task('html', () => {
    if (ENV === 'build') {
        return gulp.src(dirs.html.root)
            .pipe(preprocess())
            .pipe(useref())
            .pipe(gulpif('*.js', uglify()))
            .pipe(gulp.dest(dirs.html.build));
    } else {
        return gulp.src(dirs.html.root)
            .pipe(preprocess())
            .pipe(gulp.dest(dirs.html.dev));
    }

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
gulp.task('watch', ['clean', 'css', 'html', 'browser-sync'], () => {
    gulp.watch(dirs.scss.all, ['css', browserSync.reload]);
    gulp.watch(dirs.js.dev, browserSync.reload);
    gulp.watch(dirs.html.all, ['html', browserSync.reload]);
});

//Clean
gulp.task('clean', () => {
    del.sync(build);
    del.sync(dirs.css.dev);
    del.sync(dirs.html.dev);
    del.sync('src/images/sprite.png');
    del.sync('src/images/sprite.svg')

});

//Build
gulp.task('build:all', ['clean', 'html', 'css', 'build:images'], () => {
    gulp.src(dirs.fonts).pipe(gulp.dest(dirs.build.fonts));
    gulp.src('src/index.html').pipe(gulp.dest(build))
});
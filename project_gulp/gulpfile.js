'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const browserSync = require('browser-sync');
const preprocess = require('gulp-preprocess');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const del = require('del');
const concat = require('gulp-concat');

//Setup
const ENV = process.env.npm_lifecycle_event;

const root = 'src/';
const build = 'build/';

// todo simplify gulpfile, espicially js part
// todo Refactor this
const dirs = {

    styles: {
        dev: root + 'scss/**/*.scss',
        build: build + 'css/'
    },

    html: {
        root: root + '*.html',
        dev: root + '/**/*.html',
        build: build,
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
    return gulp.src(dirs.styles.dev)
        .pipe(sass.sync().on('error',  sass.logError))
        .pipe(postcss())
        .pipe(gulp.dest(dirs.styles.build));
});

//JS
gulp.task('js', () => {
    let scripts = require('./scriptOrder.json');
    return gulp.src(scripts.files)
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dirs.js.build));
});

//HTML
gulp.task('html', () => {
        return gulp.src(dirs.html.root)
            .pipe(preprocess())
            .pipe(gulp.dest(dirs.html.build));
});

//Images
gulp.task('build:images', ['css'], () => {
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
            baseDir: './build'

            //for all directory view
            , directory: true
        },

        notify: false
    });
});

//Watch
gulp.task('watch', ['clean', 'html', 'js', 'build:images', 'browser-sync'], () => {
    gulp.watch(dirs.styles.dev, ['css', browserSync.reload]);
    gulp.watch(dirs.js.dev, ['js', browserSync.reload]);
    gulp.watch(dirs.html.dev, ['html', browserSync.reload]);
    gulp.watch('./scriptOrder.json', ['js', browserSync.reload]);
});

//Clean
gulp.task('clean', () => {
    del.sync(build);
    del.sync('src/images/sprite.png');
    del.sync('src/images/sprite.svg');
});

//Build
gulp.task('build:all', ['clean', 'html', 'build:images'], () => {
    gulp.src(dirs.fonts).pipe(gulp.dest(dirs.build.fonts));
});
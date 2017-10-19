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

const root = 'src/';
const build = 'build/';

//todo images folder structure
const folders = {

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

    images: {
        dev: root + 'images/**/*',
        build: build + 'images',
    },

    fonts: {
        dev: root + 'fonts/**/*',
        build: build + 'fonts'
    }
};

//CSS
gulp.task('css', () => {
    return gulp.src(folders.styles.dev)
        .pipe(sass.sync().on('error',  sass.logError))
        .pipe(postcss())
        .pipe(gulp.dest(folders.styles.build));
});

//JS
gulp.task('js', () => {
    let scripts = folders.js.dev;
    return gulp.src(scripts)
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest(folders.js.build));
});

//HTML
gulp.task('html', () => {
        return gulp.src(folders.html.root)
            .pipe(preprocess())
            .pipe(gulp.dest(folders.html.build));
});

//Images
gulp.task('build:images', ['css'], () => {
    gulp.src(folders.images.dev)

        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))

        .pipe(gulp.dest(folders.images.build));
});

//Browser sync
gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: build

            //for all directory view
            , directory: true
        },

        notify: false
    });
});

//Watch
gulp.task('watch', ['build:all', 'browser-sync'], () => {
    gulp.watch(folders.styles.dev, ['css', browserSync.reload]);
    gulp.watch(folders.js.dev, ['js', browserSync.reload]);
    gulp.watch(folders.html.dev, ['html', browserSync.reload]);
});

//Clean
gulp.task('clean', () => {
    del.sync(build);
    del.sync('src/images/sprite.png');
    del.sync('src/images/sprite.svg');
});

//Build
gulp.task('build:all', ['clean', 'html', 'js', 'build:images', ], () => {
    gulp.src(folders.fonts.dev).pipe(gulp.dest(folders.fonts.build));
});
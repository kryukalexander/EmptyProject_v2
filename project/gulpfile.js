var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var watch = require('gulp-watch');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var del = require('del');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var svgstore = require('gulp-svgstore');
var rename = require("gulp-rename");
var cheerio = require('gulp-cheerio');
var preprocess = require('gulp-preprocess');

//build html
gulp.task('build:html', function () {
    return gulp.src('src/*.html')
        .pipe(preprocess())
        .pipe(useref())
        .pipe(gulpif('*.css', cssnano()))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulp.dest('build'));
});

// scss
gulp.task('build:scss', function () {
    return gulp.src('src/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 25 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(cssnano())
        .pipe(gulp.dest('build/css/'));
});

//build js
gulp.task('build:js', function () {
    return gulp.src('src/partials/_scritps.html')
        .pipe(useref())
        .pipe(gulp.dest('build'));
});

//build images

gulp.task('build:images', function () {
    return gulp.src('src/images/**/*')

        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))

        .pipe(gulp.dest('build/images'));
});

//browser sync
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'build'

            //for all directory view
            , directory: true


        },

        notify: false
    });
});

gulp.task('clean', function () {
    return del.sync('build/');
});

gulp.task('watch', ['build:html', 'build:scss', 'build:js', 'build:images', 'browser-sync'], function () {
    gulp.watch('src/scss/**/*.scss', ['build:scss']);
    gulp.watch('src/js/**/*.js', ['build:html'], browserSync.reload);
    gulp.watch('src/**/*.html', ['build:html'], browserSync.reload);
    gulp.watch('src/images/**/*', ['build:images'], browserSync.reload);
    gulp.watch('build/css/**/*.css', browserSync.reload);
    gulp.watch('build/js/**/*.js', browserSync.reload);
});




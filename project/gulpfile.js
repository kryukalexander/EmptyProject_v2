//Plugins

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

//Patchs

var dir = 'app/';
var build = 'dist';
var scss_patch = dir + 'scss/';
var css_patch = dir + 'css/';
var js_patch = dir + 'js/';
var pre_img_patch = dir + 'img_src/';
var img_patch = dir + 'images/';
var svg_patch = dir + 'svg/';


//Tasks

//Sass to css + autoprefix + min
gulp.task('sass', function () {
    return gulp.src(scss_patch + 'style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 25 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(gulp.dest(css_patch));
});

//Browser sync
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: dir

            //for all directory view
            //,directory: true 

            //for custom index
            // ,index: 'somefilename.html' 

        },

        notify: false
    });
});

//images

gulp.task('img', function () {
    return gulp.src(img_patch + '**/*')

        .pipe(imagemin({ 
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))

        .pipe(gulp.dest(build + '/images')); 
});

//Watch

gulp.task('watch', ['browser-sync', 'sass'], function () {
    gulp.watch(scss_patch + '*.scss', ['sass']);
    gulp.watch(css_patch + '*.css', browserSync.reload);
    gulp.watch(js_patch + '*.js', browserSync.reload);
    gulp.watch(dir + '*.html', browserSync.reload);
});

//Build

gulp.task('html', ['sass'], function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cssnano()))
        .pipe(gulp.dest(build));
});

gulp.task('clean', function () {
    return del.sync(build);
});

gulp.task('build', ['clean', 'img', 'html'], function () {

    gulp.src('app/fonts/**/*')
        .pipe(gulp.dest(build + '/fonts'));
});

gulp.task('svgstore', function () {
    return gulp.src(svg_patch + 'icon/**/*.svg')
        .pipe(rename({prefix: 'icon-'}))
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[style]').removeAttr('style');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(gulp.dest(svg_patch));
});


const gulp = require('gulp');
const gulpIf = require('gulp-if');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');
const concat = require('gulp-concat');
const jsImport = require('gulp-js-import');
const sourcemaps = require('gulp-sourcemaps');
const htmlPartial = require('gulp-html-partial');
const clean = require('gulp-clean');
const isProd = process.env.NODE_ENV === 'prod';

const htmlFile = [
    '*.html'
];

function html() {
    return gulp.src(htmlFile)
        .pipe(htmlPartial({
            basePath: 'partials/'
        }))
        .pipe(gulpIf(isProd, htmlmin({
            collapseWhitespace: true
        })))
        .pipe(gulp.dest('dist'));
}

function css() {
    return gulp.src(['assets/scss/main.scss'])
    .pipe(sass({
      outputStyle: 'expanded',
      sourceComments: 'map',
      sourceMap: 'scss',
      includePaths: ['node_modules']
    }).on('error', sass.logError))
    .pipe(cssmin())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

function js() {
    return gulp.src(['assets/js/jquery.min.js', 'assets/js/bootstrap.min.js', 'assets/js//jquery.lazy.min.js', 'assets/js//jquery.lazy.plugins.min.js', 'assets/js/index.js'])
        .pipe(jsImport({
            hideConsole: true
        }))
        .pipe(concat('index.js'))
        .pipe(gulp.dest('dist/js'));
}

function img() {
    return gulp.src('assets/img/*')
        .pipe(gulp.dest('dist/img/'));
}

function serve() {
    browserSync.init({
        open: true,
        server: './dist'
    });
}

function browserSyncReload(done) {
    browserSync.reload();
    done();
}


function watchFiles() {
    gulp.watch(['index.html', 'partials/**/*.html'], gulp.series(html, browserSyncReload));
    gulp.watch('assets/**/*.scss', gulp.series(css, browserSyncReload));
    gulp.watch('assets/js/**/*.js', gulp.series(js, browserSyncReload));
    gulp.watch('assets/img/**/*.*', gulp.series(img));

    return;
}

function del() {
    return gulp.src('dist/*', {read: false})
        .pipe(clean());
}

exports.css = css;
exports.html = html;
exports.js = js;
exports.del = del;
exports.serve = gulp.parallel(html, css, js, img, watchFiles, serve);
exports.default = gulp.series(del, html, css, js, img);
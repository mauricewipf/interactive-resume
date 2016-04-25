var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var nunjucksRender = require('gulp-nunjucks-render');
var sourcemaps = require('gulp-sourcemaps');
var prettify = require('gulp-prettify');
var sitemap = require('gulp-sitemap');
var bootlint  = require('gulp-bootlint');

var assets_path = "assets/";

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    port: 8000,
    livereload: true
  });
});

gulp.task('bootlint', function() {
    return gulp.src('./dist/**/*.html')
        .pipe(bootlint({
          loglevel: ['emergency', 'alert', 'critical', 'error', 'warning', 'notice', 'info', 'debug'],
          reportFn: function(file, lint, isError, isWarning, errorLocation) {
                var message = (isError) ? "ERROR! - " : "WARN! - ";
                if (errorLocation) {
                    message += file.path + ' (line:' + (errorLocation.line + 1) + ', col:' + (errorLocation.column + 1) + ') [' + lint.id + '] ' + lint.message;
                } else {
                    message += file.path + ': ' + lint.id + ' ' + lint.message;
                }
                console.log(message);
            },
            summaryReportFn: function(file, errorCount, warningCount) {
                if (errorCount > 0 || warningCount > 0) {
                    console.log("please fix the " + errorCount + " errors and "+ warningCount + " warnings in " + file.path);
                } else {
                    console.log("No problems found in "+ file.path);
                }
            }
        }));
});

gulp.task('sass', function () {
  gulp.src('./assets/sass/*.css')
    .pipe(gulp.dest('./dist/assets/css'));
  gulp.src('./assets/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded', sourceComments: false}).on('error', sass.logError))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(connect.reload());
});

gulp.task('default', ['robots-txt', 'template', 'sass', 'sitemap', 'bootlint', 'connect', 'watch'])
function swallowError (error) {
    // details of the error in the console
    console.log(error.toString());
    this.emit('end');
}

gulp.task('template', function () {
    nunjucksRender.nunjucks.configure(['html/'], { watch: false });
    // used !(_)*.html to exclude rendering of the files with prefix "_" (underscore)
    return gulp.src('./html/**/!(_)*.html')
        .pipe(nunjucksRender({
            css_path: "/" + assets_path + "css/",
            js_path: "/" + assets_path + "js/",
            img_path: "/" + assets_path + "images/"
        }))
        .pipe(prettify({indent_size: 4}))
        .on('error', swallowError)
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
});

gulp.task('sitemap', function () {
    gulp.src('./dist/**/*.html')
        .pipe(sitemap({
            siteUrl: 'http://mauwi.me'
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('robots-txt', function () {
    gulp.src('./robots.txt')
      .pipe(gulp.dest('./dist'));
});

gulp.task('images', function () {
    gulp.src('./assets/images/*.*')
      .pipe(gulp.dest('./dist/assets/images/'));
});

gulp.task('fonts', function () {
    gulp.src('./assets/fonts/*.*')
      .pipe(gulp.dest('./dist/assets/fonts/'));
});

gulp.task('js', function () {
    gulp.src('./assets/js/*.*')
      .pipe(gulp.dest('./dist/assets/js/'));
});

gulp.task('watch', function () {
    gulp.watch(['./html/**/*.html','./assets/sass/**/*.scss'], ['template', 'sass', 'bootlint']);
});

gulp.task('default', ['robots-txt', 'template', 'sass', 'sitemap', 'bootlint', 'connect', 'watch'])
gulp.task('assets', ['images', 'fonts', 'js'])

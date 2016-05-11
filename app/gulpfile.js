var gulp = require('gulp'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    gulpif = require('gulp-if'),
    clean = require('gulp-clean'),
    notify = require("gulp-notify"),
    sass = require("gulp-sass"),
    cssnano = require('gulp-cssnano'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload');

//images
gulp.task('image', function() {
    return gulp.src('app/img/*.*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img'))
        .pipe(notify("images completed!"));
});

//clean 
gulp.task('clean', function() {
    return gulp.src('dist', { read: false })
        .pipe(clean());
});

//css
gulp.task('sass', function() {
    return gulp.src('app/sass/*.sass')
        .pipe(sass())
        .pipe(autoprefixer("last 15 versions"))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css/'))
        .pipe(notify("sass completed!"));
});

//js
gulp.task('js', function() {
    return gulp.src('app/js/*.js')
        .pipe(gulp.dest('dist/js/'))
        .pipe(notify("js completed!"));
});

//всякие ништяки для js
gulp.task('vendor-js', function() {
    return gulp.src('vendor/js/*.js')
        .pipe(gulp.dest('dist/js'));
});

//всякие css ништяки
gulp.task('vendor-css', function() {
    return gulp.src('vendor/css/*.css')
        .pipe(gulp.dest('dist/css'));
});

//final building
gulp.task('final', ['sass', 'image', 'js', 'vendor-js', 'vendor-css'], function() {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('dist/'))
        .pipe(livereload())
        .pipe(notify("Compilation completed!"));
});

gulp.task('default', function() {
    livereload.listen({ basePath: '' });
    gulp.watch("app/*.html", ['final']).on('change', livereload.changed);
    gulp.watch("app/sass/*.sass", ['final']).on('change', livereload.changed);
    gulp.watch("app/js/*.js", ['final']).on('change', livereload.changed);
    gulp.watch("app/img/*", ['final']).on('change', livereload.changed);
});

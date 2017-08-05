var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    coffee = require('gulp-coffee'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    inject = require('gulp-inject'),
    angularFilesort = require('gulp-angular-filesort'),
    mainBowerFiles = require('main-bower-files');



var jsSources = ['app/**/*.js'],
    htmlSource=['app/**/*.html'],
    coffeeSources = ['app/**/*'],
    sassSources = ['app/**/*.scss'],
    outputDir_js = 'js',
    outputDir_css = 'css';




gulp.task('log', function() {
    gutil.log('== My First Task ==')
});


gulp.task('sass', function() {
    gulp.src(sassSources)
        .pipe(sass({ style: 'expanded' }))
        .on('error', gutil.log)
        .pipe(concat('main.css'))
        .pipe(gulp.dest(outputDir_css))
        .pipe(connect.reload())
});


gulp.task('js', function() {
    gulp.src(jsSources)
        // .pipe(uglify())
        .pipe(connect.reload())
});

gulp.task('html', function() {
    gulp.src(htmlSource)
        // .pipe(uglify())
        .pipe(connect.reload())
});

gulp.task('watch', function() {
    gulp.watch(sassSources, ['sass']);
    gulp.watch('app/**/*.js', ['js']);
    gulp.watch('app/**/*.html', ['html']);
});

gulp.task('connect', function() {
    connect.server({
        root: '.',
        livereload: true
    })
});


gulp.task('index', function() {
    var target = gulp.src('./index.html');
    var sources = gulp.src(['app/**/*.js']);
    var cssSources=gulp.src(['css/**/*.css']);

    target.pipe(inject(gulp.src(mainBowerFiles(),{read: false}), {name: 'bower', relative: true}))
        .pipe(gulp.dest('.'))

    target.pipe(inject(cssSources))
        .pipe(gulp.dest('.'))
    return target.pipe(inject(sources.pipe(angularFilesort())))
        .pipe(gulp.dest('.'))

});

gulp.task('serve', ['sass', 'connect', 'watch', 'index']);

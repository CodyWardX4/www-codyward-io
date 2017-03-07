var gulp = require('gulp');
var sass = require('gulp-sass');
var prefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();

gulp.task('styles', function () {
 return gulp.src('assets/scss/**/*.scss')
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(prefixer('last 2 versions'))
   .pipe(gulp.dest('assets/css'))
   .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function(){
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('assets/scss/**/*.scss', ['styles']);
    gulp.watch('./**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['styles', 'watch']);

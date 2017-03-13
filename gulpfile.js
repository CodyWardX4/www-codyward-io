var gulp = require('gulp');
var sass = require('gulp-sass');
var prefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var pump = require('pump');
var uglify = require('gulp-uglify');

gulp.task('styles', function () {
 return gulp.src('local/scss/**/*.scss')
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(rename({suffix: '.min'}))
   .pipe(prefixer('last 2 versions'))
   .pipe(gulp.dest('dist/css'))
   .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function (x) {
  pump([
         gulp.src('local/js/**/*.js'),
         uglify(),
         rename({suffix: '.min'}),
         gulp.dest('dist/js')
     ],
     x
   );
});

gulp.task('watch', function(){
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('local/scss/**/*.scss', ['styles']);
    gulp.watch('local/js/**/*.js', ['scripts']);
    gulp.watch('./**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['styles', 'scripts', 'watch']);

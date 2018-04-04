const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

gulp.task('css', function () {
    return gulp.src('./scss/base.scss')
               .pipe(sass().on('error', sass.logError))
               .pipe(rename(function(path){
                   path.basename = 'style'
               }))
               .pipe(gulp.dest('./app/css/'))
})

gulp.task('css:watch', function () {
    gulp.watch('scss/**/*.scss', ['css'])
})

gulp.task('serve', ['css:watch'], function() {
    browserSync({
        server: {
            baseDir: 'app'
        }
    })

    gulp.watch(['**/*.html', 'css/*.css', 'js/*.js', 'imgs/**/*.*'], {cwd: 'app'}, reload)
});

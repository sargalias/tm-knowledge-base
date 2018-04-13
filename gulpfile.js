const gulp = require('gulp');
const path = require('path');

const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

const root = path.join(__dirname, 'public');
const sassPath = root + '/scss';
const cssPath = path.join(root, 'css');



gulp.task('css', function() {
    return gulp.src(sassPath + '/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write(sassPath + 'maps'))
        .pipe(gulp.dest(cssPath));
});

// Watch everything
gulp.task('watch', function() {
    gulp.watch([sassPath + '/*'], ['css']);
});

// Default task (runs at initiation: gulp --verbose)
gulp.task('default', ['watch']);
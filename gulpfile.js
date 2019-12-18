const gulp = require('gulp');
const zip = require('gulp-zip');
const foreach = require('gulp-foreach');

gulp.task('zip-dist', function () {
    return gulp.src('./dist/electron/*')
        .pipe(foreach(function (stream, file) {
            var fileName = file.path.substr(file.path.lastIndexOf('/') + 1);
            gulp.src('./dist/' + fileName + '/**/*')
                .pipe(zip(fileName + '.zip'))
                .pipe(gulp.dest('./zipped'));

            return stream;
        }));
});

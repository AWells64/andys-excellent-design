let gulp = require('gulp');
let sass = require('gulp-sass');
let combine = require("gulp-concat");
let rename = require("gulp-rename"); 
let gulpSequence = require('gulp-sequence');
let watch = require('gulp-watch'); 
let cleanCSS = require('gulp-clean-css');


gulp.task('sass', function () {
    var stream = gulp.src('./css/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css/'))
        .pipe(rename('main.css'))
    return stream;
});

gulp.task('combine', function () {
	return gulp.src(['css/resets.css', 'css/main.css'])
		.pipe(combine('all.css'))
		.pipe(gulp.dest('./css/')); 
}); 

gulp.task('minify-css', () => {
  return gulp.src('css/all.css')
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./css/'));

}); 

gulp.task('styles', function(callback){
	gulpSequence('sass', 'combine', 'minify-css')(callback)
});


gulp.task('watch', function () {
	gulp.watch('./css/*.scss', ['styles']);
});


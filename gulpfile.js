let gulp = require('gulp');
let sass = require('gulp-sass');
let combine = require("gulp-concat");
let rename = require("gulp-rename"); 
let gulpSequence = require('gulp-sequence');
let watch = require('gulp-watch'); 
let cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-html-minifier2');
let uglify = require("gulp-uglify-es").default;


gulp.task('sass', function () {
    var stream = gulp.src('./src/css/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css/'))
        .pipe(rename('main.css'))
    return stream;
});

gulp.task('combine', function () {
	return gulp.src(['src/css/resets.css', 'src/css/main.css'])
		.pipe(combine('all.css'))
		.pipe(gulp.dest('./src/css/')); 
}); 

gulp.task('minify-css', () => {
  return gulp.src('src/css/all.css')
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('./docs/css/'));
}); 

gulp.task('minify-html', function() {
	gulp.src('./src/*.html')
	  .pipe(htmlmin({collapseWhitespace: true}))
	  .pipe(gulp.dest('./docs/'))
  });

gulp.task("uglify", () => {
return gulp.src("./src/js/main.js")
	.pipe(uglify())
	.pipe(gulp.dest("./docs/js/"))
});

gulp.task('allTasks', function(callback){
	gulpSequence('sass', 'combine', 'minify-css', 'minify-html', 'uglify')(callback)
});


gulp.task('watch', function () {
	gulp.watch('./src/css/*.scss', ['allTasks']);
	gulp.watch('./src/js/main.js', ['allTasks']);
	gulp.watch('./src/*.html', ['allTasks']);
});


var gulp = require('gulp');
var plug = require('gulp-load-plugins')();

var source = [
	'./src/client/app/**/*module*.js',
	'./src/client/app/**/*.js',
	'!./src/client/app/**/{,/*-spaghetti.js}'
];

gulp.task('ngAnnotateTest', () => {
	return gulp
		.src(source)
		.pipe(plug.ngAnnotate({add: true, single_quotes: true}))
		.pipe(plug.rename((path) => {
			path.extname = '.annotated.js';
		}))
		.pipe(plug.uglify({mangle: true}))
		.pipe(gulp.dest('./build'));
});

gulp.task('hint', () => {
	return gulp
		.src(source)
		.pipe(plug.jshint('./.jshintrc'))
		.pipe(plug.jshint.reporter('jshint-stylish'));
});

gulp.task('watch', () => {
	return gulp
		.watch(source, ['hint'])
});
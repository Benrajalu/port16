var gulp = require('gulp');
//var watch = require('gulp-watch');
var compass = require('gulp-compass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var liveReload = require('gulp-livereload');
var plumber = require('gulp-plumber');
var debug = require('gulp-debug');
var browserSync = require('browser-sync').create();
var ghPages = require('gulp-gh-pages');

//scripts
gulp.task("scripts", function() {
	return gulp.src('assets/js/**/*.js')
		.pipe(debug({title: 'scripts:'}))
		.pipe(plumber())
		.pipe(browserSync.stream());
});
gulp.task("frags", function() {
	return gulp.src('elements/**/*.js')
		.pipe(debug({title: 'frags:'}))
		.pipe(plumber())
		.pipe(browserSync.stream());
});
gulp.task("views", function() {
	return gulp.src('views/**/*.js')
		.pipe(debug({title: 'views:'}))
		.pipe(plumber())
		.pipe(browserSync.stream());
});

//styles
gulp.task("styles", function(cb) {
	return gulp.src('assets/scss/**/*.scss')
		.pipe(debug({title: 'styles:'}))
		.pipe(plumber())
		.pipe(compass({
			config_file: './config.rb',
			css: 'assets/css',
			sass: 'assets/scss',
			fonts: 'assets/fonts'
		})).on('error', cb)
		.pipe(browserSync.stream());
});

//images
gulp.task("images", function() {
	return gulp.src('assets/img/**/*.{jpg,jpeg,png,gif}')
		.pipe(debug({title: 'image:'}))
		.pipe(plumber())
		.pipe(browserSync.stream());
});

// Server
gulp.task('serve', ['scripts', 'styles'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("assets/js/**/*.js", ['scripts']);
    gulp.watch("elements/**/*.js", ['frags']);
    gulp.watch("views/**/*.js", ['views']);
    gulp.watch("assets/scss/**/*.scss", ['styles']);
    gulp.watch("assets/img/**/*.{jpg,jpeg,png,gif}", ['images']);
    gulp.watch("**/*.html").on('change', browserSync.reload);
});

gulp.task('build', function() {
  	gulp.src('assets/css/*')
  			.pipe(gulp.dest('dist/assets/css'));
  	gulp.src('assets/fonts/**/*')
  			.pipe(gulp.dest('dist/assets/fonts'));
  	gulp.src('assets/img/*')
  			.pipe(gulp.dest('dist/assets/img'));
  	gulp.src('assets/js/*')
  			.pipe(gulp.dest('dist/assets/js'));

  	gulp.src('bower_components/**/*.min.js')
  			.pipe(gulp.dest('dist/bower_components'));

  	gulp.src('data/*')
  			.pipe(gulp.dest('dist/data'));

  	gulp.src('elements/*')
  			.pipe(gulp.dest('dist/elements'));

  	gulp.src('views/*')
  			.pipe(gulp.dest('dist/views'));

  	gulp.src('*.html')
  			.pipe(gulp.dest('dist'));
});


gulp.task('deploy', function() {
  return gulp.src('dist/**/*')
    .pipe(ghPages());
});


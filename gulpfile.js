"use strict";
const GENERATED_NAME_FOLDER = "docs"; //_site

let gulp = require("gulp"),
	autoprefixer = require("gulp-autoprefixer"),
	exec = require("gulp-exec"),
	browserSync = require('browser-sync').create(),
	cp = require("child_process");

gulp.task("css", function() {
	return gulp.src( '_assets/css/**/*.css' )
		.pipe( autoprefixer() )
		.pipe( gulp.dest( './' + GENERATED_NAME_FOLDER + '/css/' ) )
		.pipe(browserSync.stream({ match: '**/*.css' }))
	;
});

// Jekyll
gulp.task("jekyll", function() {
	// return cp.spawn("bundle", ["exec", "jekyll", "build"], { stdio: "inherit" });
	return cp.spawn("jekyll.bat", ["build"], { stdio: "inherit" });
});

gulp.task("watch", function() {

	browserSync.init({
		server: {
            baseDir: "./" + GENERATED_NAME_FOLDER + "/"
		}
	});

	gulp.watch( '_assets/css/**/*.css', gulp.series('css') );

	gulp.watch(
		[
			"./*.html",
			"./_includes/*.html",
			"./_layouts/*.html",
			"./_posts/**/*.*"
		]
	).on('change', gulp.series('jekyll', 'css'));

	gulp.watch( GENERATED_NAME_FOLDER + '/**/*.html' ).on('change', browserSync.reload );
	gulp.watch( GENERATED_NAME_FOLDER + '/**/*.js' ).on('change', browserSync.reload );
});

gulp.task("default", gulp.series("jekyll", "css", "watch"));

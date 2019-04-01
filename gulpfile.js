"use strict";
const GENERATED_NAME_FOLDER = "docs"; //_site

let gulp = require("gulp"),
	autoprefixer = require("gulp-autoprefixer"),
	browserSync = require('browser-sync').create()
;

gulp.task("css", function() {
	return gulp.src( '_assets/css/**/*.css' )
		.pipe( autoprefixer() )
		.pipe( gulp.dest( './' + GENERATED_NAME_FOLDER + '/css/' ) )
		.pipe(browserSync.stream({ match: '**/*.css' }))
	;
});

gulp.task("watch", function() {

	browserSync.init({
		server: {
            baseDir: "./" + GENERATED_NAME_FOLDER + "/"
		}
	});

	gulp.watch( '_assets/css/**/*.css', gulp.series('css') );

	gulp.watch( GENERATED_NAME_FOLDER + '/**/*.html' ).on('change', browserSync.reload );
	gulp.watch( GENERATED_NAME_FOLDER + '/**/*.js' ).on('change', browserSync.reload );
});

gulp.task("default", gulp.series("watch"));

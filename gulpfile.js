// ############################################################################
// #       PLUGINS       ######################################################
// ############################################################################

// include gulp
var gulp = require ('gulp');

// livereload-sever
var server = require('gulp-server-livereload');

// Plumber
var plumber = require('gulp-plumber');

// Notifier
var notify = require('gulp-notify');

// merge files
var concat = require('gulp-concat');

// only process files that have changed
var changed = require('gulp-changed');

// image minimizer
var imageMin = require('gulp-imagemin');

// SASS-Compiler
var sass = require('gulp-sass');

// JS-Hint
var jshint = require('gulp-jshint');

// HTML-Minifier
var	minifyHTML = require('gulp-minify-html');

// CSS-Minifier
var minifyCSS = require('gulp-minify-css');

// JS-Minifier
var minifyJS = require('gulp-uglify');

// Autoprefix for browser-compatibility
//var autoprefix = require('gulp-autoprefixer');





// ############################################################################
// #        TASKS        ######################################################
// ############################################################################

// gulp-server-livereload
gulp.task('webserver', function() {
  gulp.src('./build')
    .pipe(server({
    	log: 'debug',		// Ausgabe der requests auf der Konsole -> Vorteil gegenüber gulp-connect
    	//directoryListing: true,
    	host: '0.0.0.0',
    	port: 8080,
     	livereload: true,
     	defaultFile: 'index.html'
    }));
});





// ############################################################################
// #     WATCH-TASKS     ######################################################
// ############################################################################

// img
gulp.task('imgWatch', function(){
	gulp.src(['./source/img/**/*', './source/img/*'])
		.pipe(plumber({
        	errorHandler: function (err){
        		//console.log(err);
        		 notify.onError({
                    title:    "m8-Server",
                    subtitle: "Bilder-Fehler",
                    message:  "<%= error.message %>",
                    sound:    "Beep"
                })(err);
        	}
        }))
        .pipe(changed('./build/img'))
        .pipe(imageMin())
        .pipe(gulp.dest('./build/img'))
        .pipe(notify({
			title: 'm8-Server',
			subtitle: 'Erfolg',
			message: 'Bilder erfolgreich konvertiert'
		}))
		.pipe(plumber.stop());
})

// index
gulp.task('indexWatch', function(){
	gulp.src(['./source/index.html'])
		.pipe(minifyHTML())
		.pipe(gulp.dest('./build'))
		.pipe(notify({
			title: 'm8-Server',
			subtitle: 'Erfolg',
			message: 'index.html erfolgreich erstellt'
		}));
})

// js
gulp.task('jsWatch', function(){
	gulp.src(['./source/js/**/*.js', '.source/js/*.js'])
		.pipe(plumber({
        	errorHandler: function (err){
        		//console.log(err);
        		 notify.onError({
                    title:    "m8-Server",
                    subtitle: "Javascript-Fehler",
                    message:  "<%= error.message %>",
                    sound:    "Beep"
                })(err);
        	}
        }))
        .pipe(jshint())
        .pipe(concat('main.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest('./build/js/'))
        .pipe(notify({
			title: 'm8-Server',
			subtitle: 'Erfolg',
			message: '/js erfolgreich erstellt'
		}))
		.pipe(plumber.stop());
})

// scss
gulp.task('scssWatch', function(){
	gulp.src(['./source/scss/**/*.scss', '.source/scss/*.scss'])
		.pipe(plumber({
        	errorHandler: function (err){
        		//console.log(err);
        		 notify.onError({
                    title:    "m8-Server",
                    subtitle: "Fehler beim SASS-Kompilieren",
                    message:  "<%= error.message %>",
                    sound:    "Beep"
                })(err);
        	}
        }))
        .pipe(sass())
        .pipe(concat('main.css'))
        //.pipe(autoprefix('last 2 versions'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./build/css/'))
        .pipe(notify({
			title: 'm8-Server',
			subtitle: 'Erfolg',
			message: '/scss erfolgreich kompiliert'
		}))
		.pipe(plumber.stop());
})

// views
gulp.task('viewsWatch', function(){
	gulp.src(['./source/views/**/*.html', '.source/views/*.html'])
		.pipe(minifyHTML())
		.pipe(gulp.dest('./build'))
		.pipe(notify({
			title: 'm8-Server',
			subtitle: 'Erfolg',
			message: '/views erfolgreich erstellt'
		}));
})





// ############################################################################
// #       DEFAULT       ######################################################
// ############################################################################

gulp.task('default', ['webserver', 'indexWatch', 'imgWatch', 'jsWatch', 'scssWatch', 'viewsWatch'], function() {

    // watch index.html
	gulp.watch(['./source/index.html'], function(){
		gulp.run('indexWatch');
	})

    // watch src/img-folder (aus unerfindlichen Gründen werden neue Bilder nicht automatisch konvertiert)
	gulp.watch(['./source/img/**/*.jpg', './source/img/*.jpg', './source/img/**/*.jpeg', './source/img/*.jpeg', './source/img/**/*.gif', './source/img/*.gif', './source/img/**/*.png', './source/img/*.png', './source/img/**/*.svg', './source/img/*.svg'], function(){
		gulp.run('imgWatch');
	})

	// watch src/js-folder
	gulp.watch(['./source/js/**/*.js', './source/js/*.js'], function(){
		gulp.run('jsWatch');
	})

	// watch src/scss-folder
	gulp.watch(['./source/scss/**/*.scss', './source/scss/*.scss'], function(){
		gulp.run('scssWatch');
	})

	// watch src/views-folder
	gulp.watch(['./source/views/**/*.html', './source/views/*.html'], function(){
		gulp.run('viewsWatch');
	})

});

const gulp = require('gulp'); // Task runner
const browserSync = require('browser-sync').create(); // Sync on browser after functions
const sass = require('gulp-sass'); // Convert sass file to css files
const imageMin = require('gulp-imagemin'); // Not using it, that's why discolored text
const plumber = require('gulp-plumber'); // Handling errors
const postcss = require('gulp-postcss'); // Required for tailwind, also has bunch of plugins like autoprefixer (used for other browsers)
const tailwindcss = require('tailwindcss'); // CSS framework
const cssnano = require('gulp-cssnano'); // Minify css files
const purgecss = require('gulp-purgecss'); // Delete classes that are not used in html files

/* -------------------------------------------------------------------------- */
/*                              CSS DEPENDENCIES                              */
/* -------------------------------------------------------------------------- */

// Copy tailwind dependency from node_modoules to src/css to dist/css
gulp.task('copy-tailwind-dep', function() {
	gulp.src('src/css/tailwind.css')
		.pipe(plumber())
		.pipe(postcss([tailwindcss('./src/js/tailwind.js'), require('autoprefixer')]))
		.pipe(
			purgecss({
				content: ['src/**/*.html']
			})
		)
		.pipe(cssnano())
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});

// Copy font-awesome css dependency from node_modules to src/css to dist/css
gulp.task('copy-font-awesome-dep', function() {
	gulp.src(['node_modules/@fortawesome/fontawesome-free/css/all.min.css'])
		.pipe(gulp.dest('src/css'))
		.pipe(
			purgecss({
				content: ['src/**/*.html']
			})
		)
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});

/* -------------------------------------------------------------------------- */
/*                               JS DEPENDENCIES                              */
/* -------------------------------------------------------------------------- */

// Copy jquery dependencies from node_modules to src/js to dist/js
gulp.task('copy-jquery-dep', function() {
	gulp.src('node_modules/jquery/dist/jquery.min.js')
		.pipe(gulp.dest('src/js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.stream());
});

/* -------------------------------------------------------------------------- */
/*                                  JS FILES                                  */
/* -------------------------------------------------------------------------- */

//Copy js files from src/js to dist/js
gulp.task('copy-js-files', function() {
	gulp.src('src/js/app.js')
		.pipe(plumber())
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.stream());
});

/* -------------------------------------------------------------------------- */
/*                                 HTML FILES                                 */
/* -------------------------------------------------------------------------- */

// Copy html files to from src/ to dist/
gulp.task('copy-html-files', function() {
	gulp.src('src/*.html')
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.stream());
});

/* -------------------------------------------------------------------------- */
/*                                 IMAGE FILES                                */
/* -------------------------------------------------------------------------- */

// copy image files from src/img to dist/img
gulp.task('copy-img-files', function() {
	gulp.src('src/img/*')
		.pipe(gulp.dest('dist/img'))
		.pipe(browserSync.stream());
});

/* -------------------------------------------------------------------------- */
/*                                 SASS FILES                                 */
/* -------------------------------------------------------------------------- */

// copy, compile and optimize scss files from src/scss to css/app.css
gulp.task('copy-scss-files', function() {
	gulp.src('src/scss/*.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(
			purgecss({
				content: ['src/**/*.html']
			})
		)
		.pipe(cssnano())
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});

/* -------------------------------------------------------------------------- */
/*                             WATCHING ALL FILES                             */
/* -------------------------------------------------------------------------- */

gulp.task('watch-all', function() {
	browserSync.init({
		server: './dist'
	});

	gulp.watch('src/js/tailwind.js', ['copy-tailwind-dep']);
	gulp.watch('src/css/tailwind.css', ['copy-tailwind-dep']);
	gulp.watch('src/*.html', ['copy-html-files']);
	gulp.watch('src/scss/**/*.scss', ['copy-scss-files']);
	gulp.watch('src/js/app.js', ['copy-js-files']);
	gulp.watch('src/img/*', ['copy-img-files']);
});

/* -------------------------------------------------------------------------- */
/*                                TASKS RUNNING                               */
/* -------------------------------------------------------------------------- */

gulp.task('default', [
	'copy-jquery-dep',
	'copy-tailwind-dep',
	'copy-font-awesome-dep',
	'copy-jquery-dep',
	'copy-html-files',
	'copy-scss-files',
	'copy-js-files',
	'copy-img-files',
	'watch-all'
]);

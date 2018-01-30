var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var clean = require('gulp-clean');
var pug = require('gulp-pug');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');
var imagemin = require('gulp-imagemin');

/**
 * Specify config for tasks
 */
var config = {

    // SRC
    html: 'src/*.html',
    pug: 'src/pug/*.pug',
    scss: 'src/scss/**/*.scss',
    images: 'src/images/*',
    fonts: 'src/fonts/**',
    css:[
        'node_modules/slick-carousel/slick/slick.css',
        'src/css/**/*.css',
    ],
    scssAndCss:[
        'node_modules/slick-carousel/slick/slick.css',
        'src/css/**/*.css',
        'src/scss/**/*.scss',
    ],
    js:
    [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/masonry-layout/dist/masonry.pkgd.min.js',
        'node_modules/imagesloaded/imagesloaded.pkgd.min.js',
        'node_modules/slick-carousel/slick/slick.js',
        'src/scripts/scripts.js'
    ],

    // DIST
    dist: 'dist',
    distJs: 'dist/js',
    distCss: 'dist/css',
    distImages: 'dist/images',
    distFonts: 'dist/fonts'
};

/**
 * Clear the destination folder
 */
gulp.task('clean', function () {
    gulp.src('dist/**/*.*', { read: false })
        .pipe(clean({ force: true }));
});

/**
 *  Copy all application files except *.sass .js and .html into the `dist` folder
 */
gulp.task('copy', function () {

    //copy fonts
    gulp.src(config.fonts)
        .pipe( gulp.dest(config.distFonts) ),

    //copy and minify images
    gulp.src(config.images)
        .pipe(imagemin())
        .pipe(gulp.dest(config.distImages));
});

/**
 * build js files into one bundle
 */
gulp.task('scripts', function() {
  return gulp.src(config.js)
    .pipe(sourcemaps.init())
    .pipe(concat('scripts.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.distJs));
});

/**
 * compile sass into css and build into one bundle 
 */
gulp.task('scss', function () {
  return gulp.src(config.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 15 versions'],
        cascade: true
    }))
    .pipe(concat('scss.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.distCss));
});


/**
 * build css files into one bundle
 */
gulp.task('css', function() {
  return gulp.src(config.css)
    .pipe(sourcemaps.init())
    .pipe(concat('styles.css'))
    // .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.distCss));
});

/**
 * build html files 
 */
gulp.task('pug', function () {
    gulp.src(config.pug) 
        .pipe(pug()) 
        .pipe(gulp.dest(config.dist)); 
});

gulp.task('server', function () {

    /**
     * Listening port can be specified manually via command `PORT=7777 gulp`
     */
    var serverPort = process.env.PORT || 9000;

    connect.server({
        root: config.dist,
        port: serverPort
    });

});

 /**
 * watch task
 */
gulp.task('watch', function () {
  //pug
  gulp.watch(config.pug, ['pug']),

  //fonts
  gulp.watch(config.fonts, ['copy']),

  //images
  gulp.watch(config.images, ['copy']),

  //scss
  gulp.watch(config.scss, ['scss']),

  //css
  gulp.watch(config.css, ['css']),

  //js
  gulp.watch(config.js, ['scripts'])

});

/**
 * Default gulp task
 */
gulp.task('default', ['server', 'clean', 'copy', 'scripts', 'scss', 'css', 'pug', 'watch']);

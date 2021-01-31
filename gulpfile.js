const { src, dest, watch, parallel, series} = require('gulp');
const scss = require('gulp-sass')
const concat = require('gulp-concat')
const browserSync = require('browser-sync').create();
const uglify =require('gulp-uglify-es').default;
const autoprefixer =require('gulp-autoprefixer')
const imagemin = require('gulp-imagemin')
const del = require('del')
const pug = require('gulp-pug')

function browsersync() {
  browserSync.init({
      server: {
          baseDir:'app/'
      }
  });
}



function img() {
    return src('app/img/**/*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(dest('/'))
}


function scripts( ) {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/slick-carousel/slick/slick.min.js',
        'app/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())

}

function cleanDist() {
    return del('docs')
}

function mixinScss() {
    return src([ 
        'node_modules/normalize-scss/sass/_normalize.scss',
        'app/scss/variables.scss',
        'app/scss/style.scss'  
    ])
    .pipe(concat('main.scss'))
    .pipe(dest('app/scss'))
    
}

function styles() {
    return src([
        'node_modules/normalize.css',
        'node_modules/slick-carousel/slick/slick.scss',
        'node_modules/slick-carousel/slick/slick-theme.scss',
        'app/scss/style.scss'])
          .pipe(scss({outputStyle:'compressed'}))
          .pipe(concat('style.min.css'))
          .pipe(autoprefixer({
              overrideBrowserslist:['last 10 version'],
              grid: true
          }))
          .pipe(dest('app/css'))
          .pipe(browserSync.stream())
}

// pug setings
function devHtml() {
    return src('app/index.pug')
    .pipe(pug({
        pretty:true,
    }))
    .pipe(concat('index.html'))
    .pipe(dest('app'))
    .pipe(browserSync.stream())  
}


function watching() {
    watch(['app/scss/**/*.scss'], styles)
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts)
    watch(['app/*.pug'], devHtml)
    watch(['app/*.html']).on('change',browserSync.reload);
}

function build() {
    return src([
        'app/css/style.min.css',
        'app/fonts/**/*',
        'app/js/main.min.js',
        'app/*.html'
    ],{base:'app'})
    .pipe(dest('docs'))
    
}


exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.build =series(cleanDist,build);
exports.img = img;
exports.clean =cleanDist;
exports.mixinstyle = mixinScss;
exports.devHtml = devHtml;
exports.default = parallel(styles,scripts,browsersync,devHtml, watching)
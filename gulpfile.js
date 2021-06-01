const gulp = require('gulp');
const { src, dest, series } = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');


sass.compiler = require('node-sass');

const foundationStyle = [
  'node_modules/normalize.css/normalize.css',
  'src/scss/main.scss'
];

function copy() {
  return src('src/*.html')
    .pipe(dest('dist'))
    .pipe(reload({ stream: true }));
  
}

exports.copy = copy;

function clean() {
  return gulp.src('./dist/**/*', { read: false })
    .pipe(rm())
}

exports.clean = clean;

function styles() {
  return src(foundationStyle)
    .pipe(concat('main.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(px2rem())
    .pipe
    (autoprefixer({
      overrideBrowserslistrc: ['last 2 versions'],
      cascade: false
    })
  )
  .pipe(gcmq())
    .pipe(dest('dist/css'))
    .pipe(reload({ stream: true }));
};

exports.styles = styles;


function scripts() {
  return src('src/js/**/*.js').pipe(dest('dist/js'))
  .pipe(reload({ stream: true }));
}

exports.scripts = scripts;


function html() {
  return src('src/*.html').pipe(dest('dist'))
    .pipe(reload({ stream: true }));
};

exports.html = html;

function server(done) {
  browserSync.init({
     server: {
         baseDir: "dist"
    },
    cors: true,
    notify: false,
    ui: false
  })
  done()
};
 
exports.server = server;

function watcher() {
  gulp.watch("src/scss/**/*.scss", series(styles));
  gulp.watch("src/js/script.js", series(scripts));
  gulp.watch("src/*.html", series(html));
};


const build = series(
  clean,
  styles,
  scripts,
  html
)

exports.build = build;


exports.default = series(
  build,
  server,
  watcher
)




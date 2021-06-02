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
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

sass.compiler = require('node-sass');

function clean() {
  return gulp.src('./dist/**/*', { read: false })
    .pipe(rm())
}

exports.clean = clean;

function copy() {
  return src('src/*.html')
    .pipe(dest('dist'))
    .pipe(reload({ stream: true }));
  
}

exports.copy = copy;

function html() {
  return src('src/*.html').pipe(dest('dist'))
    .pipe(reload({ stream: true }));
};

exports.html = html;

const foundationStyle = [
  'node_modules/normalize.css/normalize.css',
  'src/scss/main.scss'
];

function styles() {
  return src(foundationStyle)
    .pipe(sourcemaps.init())
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
    // .pipe(gcmq())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(dest('dist/css'))
    // .pipe(reload({ stream: true }));
};

exports.styles = styles;


function scripts() {
  return src('src/scripts/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('main.js', { newLine: ';' }))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(reload({ stream: true }));
};

exports.scripts = scripts;




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
  gulp.watch('./src/scripts/*.js', series('scripts'));
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




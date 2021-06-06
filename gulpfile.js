const gulp = require('gulp');
const { src, dest, series,watch,parallel} = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
// const px2rem = require('gulp-smile-px2rem');
// const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');
const imagemin = require('gulp-imagemin');



sass.compiler = require('node-sass');

const {SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS} = require('./gulp.config');

const env = process.env.NODE_ENV;

const foundationStyle = [
	
	`${SRC_PATH}/scss/main.scss`
  ];


const copy = () => {
  return gulp.src(`${SRC_PATH}/img/**/*.{jpg,png,svg,webp}`)
  .pipe(gulpif(env == 'prod', imagemin([
    imagemin.mozjpeg({
      progressive: true,
      quality: 75
    }),
    imagemin.optipng({
      optimizationLevel: 3
    }),
    imagemin.svgo(),
  ])))
  .pipe(gulp.dest(`./${DIST_PATH}/img`));
}


exports.copy = copy;

function clean() {
  return gulp.src(`./${DIST_PATH}/**/*`, { read: false })
    .pipe(rm())
}

exports.clean = clean;


function html() {
  return src(`${SRC_PATH}/*.html`).pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
};

exports.html = html;



function styles() {
  return src([...STYLE_LIBS,... foundationStyle])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    // .pipe(px2rem())
    .pipe(gulpif(env === 'prod', autoprefixer()))
    // .pipe(gcmq())
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(`${DIST_PATH}/css`))
    .pipe(reload({ stream: true }));
};

exports.styles = styles;


function scripts() {
  return src(`${SRC_PATH}/js/*.js`)
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('script.js', { newLine: ';' }))
    .pipe(gulpif(env === 'prod', babel({
      presets: ['@babel/env']
    })))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(`${DIST_PATH}/js`))
    .pipe(reload({ stream: true }));
};

exports.scripts = scripts;




function server(done) {
  browserSync.init({
     server: {
         baseDir: DIST_PATH
    },
    cors: true,
    notify: false,
    ui: false
  })
  done()
};
 
exports.server = server;


  
 const icons = () => {
  return src(`${SRC_PATH}/img/icons/*.svg`)
    .pipe(svgo({
      plugins: [
        {
          removeAttrs: {
            attrs: '(fill|stroke|style|width|height|data.*)'
          }
        }
      ]
    }))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: './sprite.svg'
        }
      }
    }))
    .pipe(dest(`${SRC_PATH}/img/icons`));
 };
  
exports.icons = icons;

function watcher() {
  watch(`${SRC_PATH}/scss/**/*.scss`, series(styles));
  watch(`${SRC_PATH}/js/scripts/*.js`, series(scripts));
  watch(`${SRC_PATH}/*.html`, series(html));
  watch(`${SRC_PATH}/img/icons/*.svg`, series(icons));
  watch(`${SRC_PATH}/img/**/*.{jpg,png,svg,webp}`, series(icons));
};


const build = series(
  clean,
  parallel(
    styles,
    scripts,
    copy,
    html
  )
)

exports.build = build;


exports.default = series(
  build,
  server,
  watcher
)




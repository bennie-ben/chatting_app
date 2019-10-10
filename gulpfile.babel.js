import gulp from "gulp";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import minifyCSS from "gulp-csso";
import browserify from "gulp-browserify";
import babelify from "babelify";
sass.compiler = require("node-sass");

const paths = {
  styles: {
    src: "assets/scss/styles.scss",
    dest: "static/styles",
    watch: "assets/scss/**/*.scss"
  },
  js: {
    src: "assets/js/main.js",
    dest: "static/js"
  }
};
const styles = () =>
  gulp
    .src(paths.styles.src)
      .pipe(sass())
      .pipe(autoprefixer({
        cascade: false
      }))
      .pipe(minifyCSS({
        restructure: false,
        sourceMap: true,
        debug: true
      }))
      .pipe(gulp.dest(paths.styles.dest));

const js = () =>
  gulp
    .src(paths.js.src)
      .pipe(browserify({
        transform : [
          babelify.configure({
            presets : ["@babel/preset-env"]
          })
        ]
      }))
    .pipe(gulp.dest(paths.js.dest));

const watchfiles = () => 
  gulp
    .watch(paths.styles.watch, styles)

const dev = gulp.series([styles, js, watchfiles]);

export default dev;
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const rename = require("gulp-rename");
const svgstore = require("gulp-svgstore");
const csso = require("gulp-csso");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const del = require("del");
const htmlmin = require("gulp-htmlmin");

// Styles

const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "source"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series("styles"));
  gulp.watch("source/*.html", gulp.series(html));
  gulp.watch("source/*.html").on("change", sync.reload);
  gulp.watch("source/css/*.css").on("change", sync.reload);
}

//Images

const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.mozjpeg({progressive: true}),
        imagemin.svgo()
      ]))
}

exports.images = images;

//webp

const createWebp = () => {
  return gulp.src("source/img/**/*.{png,jpg}")
      .pipe(webp({quality: 90}))
      .pipe(gulp.dest("build/img"))
}

exports.webp = createWebp;

//sprites

const sprite = () => {
    return gulp.src("source/img/**/icon-*.svg")
        .pipe(svgstore())
        .pipe(rename("sprite.svg"))
        .pipe(gulp.dest("build/img"))
}

exports.sprite = sprite;

//copy

const copy = () => {
    return gulp.src([
        "source/fonts/**/*.{woff,woff2}",
        "source/img/**",
        "source/js/**",
        "source/*.ico",
        "source/*.html",
        "source/css/style.css"
      ], {
        base: "source"
      })
      .pipe(gulp.dest("build"));
}

exports.copy = copy;

//Delete

const clean = () => {
    return del("build");
}

exports.clean = clean;

//html

const html = () => {
    return gulp
      .src("source/*.html")
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest("build"))
      .pipe(sync.stream());
};

exports.html = html;


//build

const build = (done) => {
  gulp.series(
  "clean",
  "copy",
  "styles",
  "sprite",
  "html"
)(done)
};

exports.build = build;


// start

exports.default = gulp.series(
  build, server
);

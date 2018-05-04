const gulp = require("gulp");
const sass = require("gulp-sass");
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const sassGlob = require('gulp-sass-glob');
const rename = require("gulp-rename");
const browserSync = require("browser-sync");
const autoprefixer = require("gulp-autoprefixer");
const reload = browserSync.reload;

gulp.task("scss", function () {
  return gulp
    .src("./scss/base.scss")
    .pipe(sassGlob())
    .pipe(sass(/*{ outputStyle: "compressed" }*/).on("error", sass.logError))
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions", "Android >= 4.0"],
        cascade: true,
        remove: true
      })
    )
    .pipe(
      rename(function (path) {
        path.basename = "style";
      })
    )
    .pipe(gulp.dest("./app/css/"));
});

gulp.task("pug", function () {
  return gulp
    .src("./pug/*.pug")
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest("./app/"));
});

gulp.task("watch", function () {
  gulp.watch("scss/**/*.scss", ["scss"]);
  gulp.watch("pug/**/*.pug", ["pug"]);
});

gulp.task("serve", ["watch"], function () {
  browserSync({
    server: {
      baseDir: "app"
    }
  });

  gulp.watch(
    ["**/*.html", "css/*.css", "js/*.js", "imgs/**/*.*"],
    { cwd: "app" },
    reload
  );
});

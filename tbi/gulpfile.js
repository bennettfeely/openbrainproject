gulp = require("gulp");
jade = require("gulp-jade");
htmlmin = require("gulp-htmlmin");
sass = require("gulp-sass");
autoprefixer = require("gulp-autoprefixer");
cssnano = require("gulp-cssnano");
browserSync = require("browser-sync");
rename = require("gulp-rename");
jsImport = require("gulp-js-import");
uglify = require("gulp-uglify");
concat = require("gulp-concat");

pump = require("pump");
path = require("path");
fs = require("fs");
del = require("del");

// Import data
teams = require("./src/js/_datasets.js");

// Compile Jade to HTML ==================================================================
gulp.task("jade", function() {
  return gulp
    .src("src/jade/index.jade")
    .pipe(
      jade({
        pretty: true,
        data: {
          datasets: datasets_obj
        }
      })
    )
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true
      })
    )
    .pipe(gulp.dest(""))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

// Compile CSS ===========================================================================
gulp.task("scss", function() {
  return gulp
    .src("src/scss/*.scss")
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(cssnano())
    .pipe(
      rename(function(path) {
        path.basename += ".min";
        path.extname = ".css";
      })
    )
    .pipe(gulp.dest("css"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

// Compile JS ============================================================================
gulp.task("js", function() {
  return gulp
    .src(["src/js/_datasets.js", "src/js/tbi.js"])
    .pipe(concat("tbi.js"))
    .pipe(gulp.dest("./js"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

// Move _redirects =======================================================================
gulp.task("redirects", function() {
  return gulp
    .src("src/_redirects")
    .pipe(gulp.dest(""))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

// Browser sync ==========================================================================
gulp.task("sync", function() {
  return browserSync({
    server: {
      baseDir: "./"
    }
  });
});

// Init ==================================================================================
gulp.task("default", function() {
  gulp.run("sync");

  gulp.watch(["src/jade/*.jade"], function() {
    return gulp.run("jade");
  });

  // gulp.watch("src/jade/team/index.jade", function() {
  //   return gulp.run("jade-subfolder");
  // });

  gulp.watch("src/scss/*.scss", function() {
    return gulp.run("scss");
  });

  gulp.watch(["src/js/tbi.js"], function() {
    return gulp.run("js");
  });

  gulp.watch("src/_redirects", function() {
    return gulp.run("redirects");
  });
});

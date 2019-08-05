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
videos = require("./src/js/_videos.js");

// Browser sync ==========================================================================
gulp.task("sync", function() {
  return browserSync({
    server: "dist"
  });
});

// Compile Jade to HTML ==================================================================
gulp.task("jade", function() {
  return gulp
    .src("src/jade/*.jade")
    .pipe(
      jade({
        pretty: true
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
    .pipe(gulp.dest("./dist"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("jade-subfolder", function() {
  return gulp
    .src("src/jade/*/index.jade")
    .pipe(
      jade({
        pretty: true,
        data: {
          videos: videos_arr
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
    .pipe(gulp.dest("./dist/"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("jade-sub-subfolder", function() {
  return gulp
    .src("src/jade/*/*/index.jade")
    .pipe(
      jade({
        pretty: true
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
    .pipe(gulp.dest("./dist/"))
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
    .pipe(gulp.dest("./dist/_css"))
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
    .pipe(gulp.dest("./dist/_js"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

// TBI Script ============================================================================
gulp.task("js-tbi", function() {
  return gulp.src("dist/_js/tbi.js").pipe(
    browserSync.reload({
      stream: true
    })
  );
});

// Init ==================================================================================
gulp.task("default", function() {
  gulp.run("sync");

  // Home
  gulp.watch(["src/jade/*.jade"], function() {
    return gulp.run("jade");
  });

  // Partials
  gulp.watch(["src/jade/_partials/*.jade"], function() {
    return gulp.run("jade", "jade-subfolder", "jade-sub-subfolder");
  });

  // Subfolders
  gulp.watch(["src/jade/*/index.jade"], function() {
    return gulp.run("jade-subfolder");
  });

  // Subsubfolders
  gulp.watch(["src/jade/*/*/index.jade"], function() {
    return gulp.run("jade-sub-subfolder");
  });

  // TBI scripts
  gulp.watch(["dist/_js/tbi.js"], function() {
    return gulp.run("js-tbi");
  });

  // CSS
  gulp.watch(["src/scss/*", "src/scss/partials/*"], function() {
    return gulp.run("scss");
  });
});

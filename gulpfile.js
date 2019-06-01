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
datasets = require("./src/js/_datasets.js");

// Compile Jade to HTML ==================================================================
gulp.task("jade", function() {
  return gulp
    .src("src/jade/index.jade")
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
    .pipe(gulp.dest("./dist/"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

// gulp.task("jade-tbi-subfolder", function() {
//   return gulp
//     .src("src/jade/tbi/index.jade")
//     .pipe(
//       jade({
//         pretty: true,
//         data: {
//           datasets: datasets_obj
//         }
//       })
//     )
//     .pipe(
//       htmlmin({
//         collapseWhitespace: true,
//         removeComments: true,
//         minifyCSS: true,
//         minifyJS: true
//       })
//     )
//     .pipe(gulp.dest("./dist/tbi"))
//     .pipe(
//       browserSync.reload({
//         stream: true
//       })
//     );
// });

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
    .pipe(gulp.dest("./dist/css"))
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
    .pipe(gulp.dest("./dist/js"))
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
    .pipe(gulp.dest("./dist"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

// Browser sync ==========================================================================
gulp.task("sync", function() {
  return browserSync({
    server: "dist"
  });
});

// Init ==================================================================================
gulp.task("default", function() {
  gulp.run("sync");

  // Home
  gulp.watch(["src/jade/*.jade"], function() {
    return gulp.run("jade");
  });

  // Subfolders and Partials
  gulp.watch(["src/jade/*/index.jade", "src/jade/partials/*.jade"], function() {
    return gulp.run("jade", "jade-subfolder");
  });

  // Videos
  gulp.watch(["src/js/_videos.js"], function() {
    return gulp.run("js", "jade");
  });

  // TBI
  gulp.watch(["src/js/_datasets.js", "src/js/tbi.js"], function() {
    return gulp.run("js", "jade-subfolder");
  });

  // CSS
  gulp.watch("src/scss/*.scss", function() {
    return gulp.run("scss");
  });

  // Redirects
  gulp.watch("src/_redirects", function() {
    return gulp.run("redirects");
  });
});

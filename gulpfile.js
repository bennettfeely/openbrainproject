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
teams = require("./src/js/_team.js");
regions = require("./src/js/_regions.js");
settings = require("./src/js/_settings.js");

// Transform regions object to an array to add to regions filter =========================
regions_arr = [];

Object.keys(regions_obj).forEach(function(name) {
  regions_arr.push({
    name: name,
    full_name: regions_obj[name].full_name,
    path: regions_obj[name].path
  });
});

// Compile Jade to HTML ==================================================================
gulp.task("jade", function() {
  return gulp
    .src("src/jade/index.jade")
    .pipe(
      jade({
        pretty: true,
        data: {
          regions: regions_arr,
          settings: settings,
          teams: team_arr
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
    .src("src/jade/team/index.jade")
    .pipe(
      jade({
        pretty: true,
        data: {
          regions: regions_arr,
          settings: settings,
          teams: team_arr
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
    .pipe(gulp.dest("./dist/team"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

// gulp.task("jade-subfolder", function() {
//   return gulp
//     .src(["src/jade/**/*.jade"])
//     .pipe(
//       jade({
//         pretty: true,
//         data: {
//           regions: regions_arr,
//           teams: team_arr
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
//     .pipe(gulp.dest("./dist"))
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
// gulp.task("js", function() {
//   return (
//     gulp
//       .src("src/js/brain.js")
//       .pipe(gulp.dest("./dist/js"))
//       .pipe(
//         rename(function(path) {
//           path.basename += ".min";
//           path.extname = ".js";
//         })
//       )
//       // .pipe(uglify())
//       // .pipe(gulp.dest("./dist/js"))
//       // .pipe(
//       //   browserSync.reload({
//       //     stream: true
//       //   })
//       // )
//   );
// });

gulp.task("js", function() {
  return gulp
    .src(["src/js/_settings.js", "src/js/_regions.js", "src/js/brain.js"])
    .pipe(concat("brain.js"))
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

  gulp.watch(
    ["src/jade/*.jade", "src/jade/team/*.jade", "src/jade/partials/*.jade"],
    function() {
      return gulp.run("jade", "jade-subfolder");
    }
  );

  // gulp.watch("src/jade/team/index.jade", function() {
  //   return gulp.run("jade-subfolder");
  // });

  gulp.watch("src/scss/*.scss", function() {
    return gulp.run("scss");
  });

  gulp.watch(
    ["src/js/_regions.js", "src/js/_settings.js", "src/js/brain.js"],
    function() {
      return gulp.run("js");
    }
  );

  gulp.watch("src/_redirects", function() {
    return gulp.run("redirects");
  });
});

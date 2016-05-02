// gulpfile.js
var gulp = require('gulp'),  
  electron = require('gulp-atom-electron'),
  electron_start = require('electron-prebuilt'),
  symdest = require('gulp-symdest'),
  del = require('del'),
  childProcess  = require('child_process'), 
  runSeq = require('run-sequence');

gulp.task('clean', function(){  
    return del('dist/frontend/**/*', {force:true});
});

gulp.task('copy:vendor', function(){  
    var result =  gulp.src([
            "node_modules/es6-shim/es6-shim.min.js",
            "node_modules/systemjs/dist/system-polyfills.js",
            "node_modules/angular2/bundles/angular2-polyfills.js",
            "node_modules/systemjs/dist/system.src.js",
            "node_modules/rxjs/bundles/Rx.js",
            "node_modules/angular2/bundles/angular2.dev.js",
            "node_modules/angular2/bundles/router.dev.js"
        ])
        .pipe(gulp.dest('./dist/frontend/scripts/vendor'))
    return result + gulp.src([
            "node_modules/nedb/index.js"
        ])
        .pipe(gulp.dest('./dist/frontend/scripts/vendor/nedb')) + 
        gulp.src([
            "node_modules/nedb/index.js"
        ])
        .pipe(gulp.dest('./dist/electron-package/scripts/vendor/nedb')) + 
        gulp.src([
            "node_modules/bootstrap/dist/css/bootstrap.min.css"
        ])
        .pipe(gulp.dest('./dist/frontend/css/vendor'));
})

gulp.task('copy:index', function(){  
    return gulp.src('./src/frontend/**/*.html')
        .pipe(gulp.dest('./dist/frontend'));
});

gulp.task('frontend', function(done){  
    return runSeq('clean', ['copy:vendor', 'copy:index'], done);
})

// gulpfile.js
gulp.task('clean-electron', function(){  
    return del('dist/electron-package/**/*', {force: true});
});

gulp.task('copy:electron-manifest', function(){  
   return gulp.src('./src/assets/package.json')
       .pipe(gulp.dest('./dist/electron-package'))
});

gulp.task('copy:electron-scripts', function(){  
    return gulp.src('./src/main/index.js')
        .pipe(gulp.dest('./dist/electron-package'));
});

gulp.task('copy:spa-for-electron', function(){  
    return gulp.src("./dist/frontend/**/*")
        .pipe(gulp.dest('dist/electron-package'));
});

gulp.task('electron', function(done){  
    return runSeq('clean-electron', ['copy:electron-manifest', 'copy:electron-scripts', 'copy:spa-for-electron'], done);
});


gulp.task('build-app-for-osx', function(){  
    gulp.src(['dist/electron-package/**/*'])
        .pipe(electron({
            version: '0.36.7',
            platform: 'darwin' }))
        .pipe(symdest('packages/osx'));
});
gulp.task('build-app-for-linux', function(){  
    gulp.src(['dist/electron-package/**/*'])
        .pipe(electron({
            version: '0.36.7',
            platform: 'linux' }))
        .pipe(symdest('packages/linux'));
});
gulp.task('build-app-for-win', function(){  
    gulp.src(['dist/electron-package/**/*'])
        .pipe(electron({
            version: '0.36.7',
            platform: 'win32' }))
        .pipe(symdest('packages/win'));
});

gulp.task('apps', function(done){  
    return runSeq(['build-app-for-win', 'build-app-for-linux', 'build-app-for-osx'], done);
});

gulp.task('start', function () { 
  childProcess.spawn(electron_start, ['--debug=5858','./dist/electron-package'], { stdio: 'inherit' }); 
}); 

gulp.task('run', function(done){  
    return runSeq('electron',['start'] , done);
});
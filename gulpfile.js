/**
 * Created by kinlin on 8/27/16.
 */

var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var rsync = require('gulp-rsync');

var paths = {
    sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
    gulp.src('./scss/app.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./css/'))
        .on('end', done);
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
    return bower.commands.install()
        .on('log', function(data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function(done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});

gulp.task('deploy', function() {
    gulp.src('css/**')
        .pipe(rsync({
            root: '',
            hostname: 'root@45.55.250.128',
            destination: '/app/web'
        }));
    gulp.src('img/**')
        .pipe(rsync({
            root: '',
            hostname: 'root@45.55.250.128',
            destination: '/app/web'
        }));
    gulp.src('js/**')
        .pipe(rsync({
            root: '',
            hostname: 'root@45.55.250.128',
            destination: '/app/web'
        }));
    gulp.src('bower.json')
        .pipe(rsync({
            root: '',
            hostname: 'root@45.55.250.128',
            destination: '/app/web'
        }));
    gulp.src('.bowerrc')
        .pipe(rsync({
            root: '',
            hostname: 'root@45.55.250.128',
            destination: '/app/web'
        }));
    gulp.src('scss/**')
        .pipe(rsync({
            root: '',
            hostname: 'root@45.55.250.128',
            destination: '/app/web'
        }));
    gulp.src('templates/**')
        .pipe(rsync({
            root: '',
            hostname: 'root@45.55.250.128',
            destination: '/app/web'
        }));
    gulp.src('index.html')
        .pipe(rsync({
            root: '',
            hostname: 'root@45.55.250.128',
            destination: '/app/web'
        }));
});
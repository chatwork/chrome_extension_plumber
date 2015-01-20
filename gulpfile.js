"use strict";
var gulp = require('gulp');

gulp.task('typescript', function () {
    var typescript = require('gulp-typescript');
    gulp.src(['src/_base.ts'])
        .pipe(typescript({
            module: 'commonjs',
            target: 'es5',
            removeComments: true,
            noExternalResolve: true
        }))
        .js
        .pipe(gulp.dest('extension/js/'))
    ;
    return gulp.src(['typings/**/*.ts', 'src/**/*.ts'])
        .pipe(typescript({
            module: 'commonjs',
            target: 'es5',
            removeComments: true,
            noExternalResolve: true
        }))
        .js
        .pipe(gulp.dest('dist/'))
    ;
});

gulp.task('react', function () {
    var react = require('gulp-react');
    return gulp.src(['src/**/*.jsx'])
        .pipe(react({ 'harmony' : true }))
        .pipe(gulp.dest('dist/'))
    ;
});

function browserifyCompile() {
    var browserify = require('browserify');
    var source = require('vinyl-source-stream');

    ['background', 'browser_action'].forEach(function (file) {
        browserify({
            'entries': ['./dist/'+file+'/index.js']
        })
            .bundle()
            .pipe(source(file+'.js'))
            .pipe(gulp.dest('./extension/js/'))
        ;
    });
}

gulp.task('browserify', browserifyCompile);
gulp.task('default', ['typescript', 'react'], browserifyCompile);
gulp.task('watch', ['typescript', 'react'], function () {
    browserifyCompile();
    gulp.watch(['src/**/*.jsx'], ['react']);
    gulp.watch(['src/**/*.ts'], ['typescript']);
    gulp.watch(['dist/**/*.js'], ['browserify']);
});

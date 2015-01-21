"use strict";
var gulp = require('gulp');

gulp.task('bump', function () {
    var bump = require('gulp-bump');
    var path = require('path');
    ['*.json', 'extension/*.json'].forEach(function (file) {
        gulp.src(file)
            .pipe(bump())
            .pipe(gulp.dest(path.dirname(file)))
        ;
    });
});

gulp.task('zip', function () {
    var zip = require('gulp-zip');
    var merge = require('event-stream').merge;
    return merge(
        gulp.src([
            'extension/**',
            '!extension/bower_components/**'
        ], { base: process.cwd() }),
        gulp.src([
            'extension/bower_components/react/react.js',
            'extension/bower_components/react-router/dist/react-router.js'
        ], { base: process.cwd() })
    )
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('./'))
    ;
});

gulp.task('typescript', function () {
    var typescript = require('gulp-typescript');
    gulp.src(['src/_base.ts'])
        .pipe(typescript({
            module: 'commonjs',
            target: 'es6',
            removeComments: true,
            noExternalResolve: true
        }))
        .js
        .pipe(gulp.dest('extension/js/'))
    ;
    return gulp.src(['typings/**/*.ts', 'src/**/*.ts'])
        .pipe(typescript({
            module: 'commonjs',
            target: 'es6',
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
        .pipe(react())
        .pipe(gulp.dest('dist/'))
    ;
});

gulp.task('copy', function () {
    return gulp.src(['src/**/*.js'])
        .pipe(gulp.dest('dist/'))
    ;
});

function browserifyCompile() {
    var browserify = require('browserify');
    var source = require('vinyl-source-stream');

    ['background', 'browser_action'].forEach(function (file) {
        browserify({
            'entries': ['./dist/'+file+'/index.js'],
            'exclude': ['react', 'react-router']
        })
            .bundle()
            .pipe(source(file+'.js'))
            .pipe(gulp.dest('./extension/js/'))
        ;
    });
    browserify({
        'entries': ['./dist/browser_action/_base.js'],
        'ignore': ['react']
    })
        .bundle()
        .pipe(source('_base.js'))
        .pipe(gulp.dest('./extension/js/lib'))
    ;
}

gulp.task('browserify', browserifyCompile);
gulp.task('default', ['typescript', 'react', 'copy'], browserifyCompile);
gulp.task('watch', ['typescript', 'react', 'copy'], function () {
    browserifyCompile();
    gulp.watch(['src/**/*.jsx'], ['react']);
    gulp.watch(['src/**/*.ts'], ['typescript']);
    gulp.watch(['src/**/*.js'], ['copy']);
    gulp.watch(['dist/**/*.js'], ['browserify']);
});

/* 
* @Author: Marte
* @Date:   2017-12-28 15:19:34
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-04 19:45:52
*/
// 用严格模式以防压缩的时候有ES6语法
'use strict';

// 模块化
var gulp = require('gulp');
var sass = require('gulp-sass');

// 文件路径
var path = {
    sass:'./src/sass/*.scss',
    js:['./src/js/**/*.js']
}
// 创建任务
gulp.task('compileSass',function(){
    // 文件路径
    gulp.src(path.sass)
    // 编译
    .pipe(sass({outputStyle:'expanded'}))
    // 输出
    .pipe(gulp.dest('src/css'));
})
// 监听
gulp.task('jtSass',function(){
    gulp.watch(path.sass,['compileSass']);
})

// 合并压缩js
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('mergeJs',function(){
    // 找到js文件所在位置
    gulp.src(path.js)
    // 合并
    .pipe(concat('page.js'))
    // 输出js
    .pipe(gulp.dest('./dist'))
    // 压缩
    // .pipe(uglify())
    // 重命名,后缀
    // .pipe(rename({suffix:'.min'}))
    // 输出
    // .pipe(gulp.dest('./dist'))
});
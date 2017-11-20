var gulp = require('gulp');

var qiniu = require('gulp-qn-sync')

var config = require('./src/env/' + process.env.NODE_ENV);

var fs = require('fs')


gulp.task('uploadqn', function(){
     gulp.src('./dist/**')
       .pipe(qiniu({
                accessKey: 'X2rsWcDOO-pvQFC6zNBE8DFrF_pSjzbDzP5n2AnB',
                secretKey: 'rrq2E78gyGJmJ4nyQIvsuewfexMJNPgghzDPu15c',
                bucket: 'jiuzhihtml',
                domain: 'http://file.9zhitx.com/',
                private: false
            }, {
                dir: config.staticUrl + 'dist/',
                versioning: false,
                recordInFile: 'staticfiles.json'
            }))
 });


gulp.task('default',['uploadqn']);

/**
 * 移动静态资源
 */

var srcDir = './src/app/'
gulp.task('moveFiles',function(){
    var dir = fs.readdirSync(srcDir).filter(function (file) {
        return fs.statSync(srcDir + file).isDirectory();
    })
    dir.map(function(item, index){
        gulp.src(srcDir + item + "/assets/*.*")         
        .pipe(gulp.dest('./dist/assets'))
    })
    
})
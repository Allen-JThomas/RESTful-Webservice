var gulp = require('gulp')
var nodemon = require('gulp-nodemon')
var gulpMocha = require('gulp-mocha')
var env = require('gulp-env')
var supertest =require('supertest')

gulp.task('default', function(){
  nodemon({
    script: 'app.js',
    ext: 'js', //what type of file to look for changes
    env:{
      PORT: 8000 // sets env variables
    },
    ignore: ['./node_modules/**']
  })
  .on('restart', function(){
    console.log('Restarting...')
  })
})

gulp.task('test', function(){
  env({vars: {ENV: 'Test'}})
  gulp.src('tests/*.js', {read: false})
    .pipe(gulpMocha({reporter:'nyan'}))
})
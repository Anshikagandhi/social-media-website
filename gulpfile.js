const gulp=require('gulp');


const sass=require('gulp-sass'); //converts the sass into css
const cssnano=require('gulp-cssnano'); //compresses the css file
const rev=require('gulp-rev'); // contains tasks which need to be created


gulp.task('css',function(){
    console.log('minifying css....');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
})

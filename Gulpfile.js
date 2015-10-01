var gulp         = require("gulp");
var concat       = require("gulp-concat");
var browserSync  = require("browser-sync").create();
var compass      = require("gulp-compass");
var imagemin     = require("gulp-imagemin");
var pngquant     = require("imagemin-pngquant");
var jpegtran     = require("imagemin-jpegtran");
var uglify       = require("gulp-uglify");
var rename       = require("gulp-rename");

gulp.task("server",function(){

	browserSync.init({
		server : {
			baseDir : "./"
		}
	});

});

gulp.task("html",["server"],function(){

	gulp.watch("./*.html",browserSync.reload);

});

gulp.task("imagemin",function(){

	function buildimage(src){
		return gulp.src(src)
			.pipe(imagemin({
	            progressive: true,
	            use: [pngquant()]
	        }))
	        .on("error",function(err){
	        	console.log("error");
	        })
		    .pipe(gulp.dest("./images"));
	}

	gulp.watch("./images/*.png",function(e){
		buildimage(e.path);
	});

	return buildimage("./images/*.png");
});

gulp.task('compass',["server"], function() {

	function buildcompass(src){

		return gulp.src(src)
		  .pipe(compass({
		    css: 'css',
		    sass: 'sass',
		    image : "images",
		    relative : true,
		    style : "compressed",
		    javascript : "js"　
		  }))
		  .on("error",function(err){
		  	console.log(err);
		  })
		  .pipe(browserSync.stream())
		  .pipe(gulp.dest('./css'));

	}

	gulp.watch("./sass/*.scss")

		.on("change",function(e){

			buildcompass("./sass/*.scss");

		});

	return buildcompass("./sass/*.scss");
});

// gulp.task("js",["server"],function(){

// 	function buildjs(src){
// 		return gulp.src(src)
// 		  .pipe(uglify())
// 		  .pipe(gulp.dest('dist/all.js'));
// 	}

// });

gulp.task('default',['server','compass','html','imagemin']);
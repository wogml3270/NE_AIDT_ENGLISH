const gulp = require('gulp')
const { series, watch, src } = require("gulp")
const browserSync = require("browser-sync")
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')(require('sass'))
const headerfooter = require('gulp-headerfooter')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')
const Vinyl = require('vinyl')
const spritesmith = require("gulp.spritesmith")
const inlineCss = require('gulp-inline-css');
var cache = require('gulp-cached');
var concat = require('gulp-concat');

// 설정
const autoprefixerSetup = false
const jspOut = false // 콘텐트(cts)생성
const scss = ['common', 'student', 'teacher']
const projectlist = ['teacher'] // content, lib
const scssOptions = {
	errLogToConsole: false,
	indentType: 'space', // space tab 
	indentWidth: 0, // outputStyle 이 nested, expanded 인 경우에 사용
	precision: 3, //Default : 5 CSS 의 소수점 자리수
	sourceComments: false,
	outputStyle: 'expanded' //, expanded, compact, compressed
	// outputStyle: 'compressed', //nested, expanded, compact, compressed
}
function spriteWath(cb) {
	// sprite('teacher', 'sprite-main', true)
	sprite('student', 'sprite-common', true)
	sprite('teacher', 'sprite-common', true)
	cb()
}
function spriteOne(cb) {
	sprite('teacher', 'sprite-main', true, false)
	sprite('teacher', 'sprite-sub', true, false)
	sprite('teacher', 'sprite-common', true, false)
	cb()
}
function waths(cb) {
	// html
	watchLibraryReload()
	//watchLibrary('student')
	watchLibrary('teacher')

	watchContent('teacher')
	watchFolder('teacher', '{g,lib}')
	watchFolder('teacher', '{single,popup}', false)

	//watchContent('student')
	//watchFolder('student', '{g,lib}')
	//watchFolder('student', '{single,popup}', false)
	// single('teacher')
	// todo 파일 이름을 기준으로 -p 끝나는 파일은 분기처리
	cb()
}
function watchLibraryReload() {
	console.log('watchLibraryReload start ✍️(◔◡◔) ')
	watch('**/*.js', { delay: 500 }).on('change', function (event) {
		console.log('File ' + 'change => ' + event + ', running tasks...watchLibraryReload')
		browserSync.reload()
	})
}
function watchFolder(targets, watchTarget, include = true) {
	const watcher = watch(['static/guide/' + targets + '/' + watchTarget + '/*.html'])
	watcher.on('change', function (paths, stats) {
		const file = new Vinyl({
			path: paths,
		})
		if (include) {
			gulp.src(file.dirname + '/' + file.stem + file.extname)
				.pipe(headerfooter.header('static/guide/' + targets + '/top-lib.html'))
				.pipe(headerfooter.footer('static/guide/' + targets + '/bottom.html'))
				.pipe(gulp.dest('static/guide/' + targets + '/*.html'))
		} else {
			gulp.src(file.dirname + '/' + file.stem + file.extname)
				.pipe(gulp.dest('static/guide/' + targets + '/*.html'))
		}
		browserSync.reload()
	})
}
function watchLibrary(targets) {
	const watcher = watch(['static/guide/' + targets + '/**.*'])
	watcher.on('change', function (paths, stats) {
		const file = new Vinyl({
			path: paths,
		})
		gulp.src(file.dirname + '/' + file.stem + file.extname)
			.pipe(headerfooter.header('static/guide/' + targets + '/top.html'))
			.pipe(headerfooter.footer('static/guide/' + targets + '/bottom.html'))
			.pipe(gulp.dest('static/guide/' + targets + '/dist'))
		browserSync.reload()
	})
}
function single(targets) {
	const watcher = watch(['static/guide/' + targets + '/single/*.html'])
	watcher.on('change', function (paths, stats) {
		const file = new Vinyl({
			path: paths,
		})
		gulp.src(file.dirname + '/' + file.stem + file.extname)
			.pipe(cache('singlelinting' + targets))
			.pipe(headerfooter.header('static/guide/' + targets + '/single-top.html'))
			.pipe(headerfooter.footer('static/guide/' + targets + '/single-bottom.html'))
			.pipe(gulp.dest('static/guide/' + targets + '/dist'))
		browserSync.reload()
	})
}
function watchContent(targets) {
	const watcher = watch('static/guide/' + targets + '/content/*.html')
	watcher.on('change', function (paths, stats) {
		const file = new Vinyl({
			path: paths,
		})
		gulp.src(file.dirname + '/' + file.stem + file.extname)
			.pipe(cache('contentlinting' + targets))
			.pipe(headerfooter.header('static/guide/' + targets + '/top.html'))
			.pipe(headerfooter.footer('static/guide/' + targets + '/bottom.html'))
			.pipe(gulp.dest('static/guide/' + targets + '/dist'))
		browserSync.reload()
		if (jspOut) {
			gulp.src(file.dirname + '/' + file.stem + file.extname)
				.pipe(headerfooter.header('<%@ page language="java" contentType="text/html charset=utf-8" pageEncoding="utf-8"%>'))
				.pipe(rename({ extname: '.jsp' }))
				.pipe(gulp.dest('WEB-INF/jsp/cts/' + targets + '/'))
		}
	})
}
function watchCts(targets) {
	function jspToHtml(paths, event) {
		const file = new Vinyl({
			path: paths,
		})
		gulp.src(file.dirname + '/' + file.stem + file.extname)
			.pipe(headerfooter.header('static/guide/' + targets + '/top.html'))
			.pipe(headerfooter.footer('static/guide/' + targets + '/bottom.html'))
			.pipe(rename({ extname: '.html' }))
			.pipe(gulp.dest('./static/guide/' + targets + '/dist'))
	}
	// chokidar.watch('WEB-INF/jsp/cts/' + targets + '/*.jsp').on('add'   , (paths, event) => { jspToHtml(paths, event) })
	chokidar.watch('WEB-INF/jsp/cts/' + targets + '/*.jsp').on('change', (paths, event) => {
		jspToHtml(paths, event)
	})
}

function contenttodist(cb) {
	console.log('contenttodist 👌')
	for (var i = projectlist.length - 1; i >= 0; i--) {
		gulp.src(`static/guide/${projectlist[i]}/content/*.html`)
			.pipe(headerfooter.header('static/guide/' + projectlist[i] + '/top.html'))
			.pipe(headerfooter.footer('static/guide/' + projectlist[i] + '/bottom.html'))
			.pipe(gulp.dest('static/guide/' + projectlist[i] + '/dist'))
	}
	cb()
}
function distall(cb) {
	var targets = 'kias'
	gulp.src('static/guide/' + targets + '/content/*.html')
		.pipe(headerfooter.header('static/guide/' + targets + '/top.html'))
		.pipe(headerfooter.footer('static/guide/' + targets + '/bottom.html'))
		.pipe(gulp.dest('static/guide/' + targets + '/dist'))
	gulp.src('static/guide/' + targets + '/lib/*.html')
		.pipe(headerfooter.header('static/guide/' + targets + '/top.html'))
		.pipe(headerfooter.footer('static/guide/' + targets + '/bottom.html'))
		.pipe(gulp.dest('static/guide/' + targets + '/dist'))
	cb()
}
function htmlmerge(cb) {
	gulp.src('static/guide/teacher/{lib,program,content}/*.html')
		.pipe(concat('teacherall.html'))
		.pipe(headerfooter.header('static/guide/teacher/top.html'))
		.pipe(headerfooter.footer('static/guide/teacher/bottom.html'))
		.pipe(gulp.dest('static/guide/teacher/'))
	cb()
}
/**
 * 
 * @param {string} site static/"서비스이름"
 * @param {string} folder static/서비스이름/"폴더이름"
 * @param {boolean} retina retina 이미지 사용 여부
 */
function sprite(site, folder, retina = false, watcher = true) {
	var spritesmithOption = {
		imgName: `${folder}.png`,
		cssName: `_${folder}.scss`,
		padding: 20,
		imgPath: `/static/${site}/img/${folder}.png`,
	}
	if (retina) {
		spritesmithOption = {
			...spritesmithOption,
			retinaSrcFilter: `static/${site}/${folder}/*@2x.png`,
			retinaImgName: `${folder}@2x.png`,
			retinaImgPath: `/static/${site}/img/${folder}@2x.png`
		}
	}
	ge = function (site, folder, spritesmithOption) {
		var spriteData = gulp.src(`static/${site}/${folder}/*.png`)
			// .pipe(cache('sprite' + site))
			.pipe(spritesmith(spritesmithOption))
		spriteData.img
			.pipe(gulp.dest(`static/${site}/img/`))
		spriteData.css
			.pipe(gulp.dest(`static/${site}/scss/`))
		console.log(site + ' sprite（￣︶￣）↗　')
	}
	if (watcher) {
		watch([`static/${site}/${folder}/*.png`], { events: 'all' }, function (cb) {
			ge(site, folder, spritesmithOption)
			cb()
		})
	}
	ge(site, folder, spritesmithOption)
}
// The `build` function is exported so it is public and can be run with the `gulp` command.
// It can also be used within the `series()` composition.
function build(cb) {
	// body omitted
	cb()
}
function scssTocss(targets) {
	console.time('scssTocss')
	if (autoprefixerSetup) {
		src('static/' + targets + '/scss/*.scss')
			.pipe(sourcemaps.init({ loadMaps: false }))
			.pipe(sass(scssOptions).on('error', sass.logError))
			.pipe(autoprefixer({ cascade: false }))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('static/' + targets + '/css/'))
			.pipe(browserSync.stream())
	}
	else {
		src('static/' + targets + '/scss/*.scss')
			.pipe(sourcemaps.init({ loadMaps: false }))
			.pipe(sass(scssOptions).on('error', sass.logError))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('static/' + targets + '/css/'))
			.pipe(browserSync.stream())
	}


	console.timeEnd('scssTocss')
}
function wscss(cb) {
	scss.forEach((el) => {
		watch(['static/' + el + '/scss/**/*.scss'], function (cb) {
			scssTocss(el)
			cb()
		})
	})
	cb()
}
function servers() {
	//https://browsersync.io/docs/options
	browserSync.init({
		server: {
			baseDir: './',
			index: '/static/guide/index.html',
			routes: {
				"/static/": "static/" //앞의 주소를 뒤에 주소로 연결시켜줌
			},
		},
		port: 3000,
	})
}

exports.build = build
exports.dist = distall
exports.htmlmerge = htmlmerge
exports.sprite = spriteWath
exports.spriteOne = spriteOne
exports.contenttodist = contenttodist
exports.sp = spriteOne
// exports.default = series(spriteWath, gulp.parallel(wscss, servers, waths))
exports.default = series(gulp.parallel(wscss, servers, waths, spriteWath))
/*
Gulp 4.0 에서는 Task 실행 순서를 통제할 수 있는 API를 제공한다. 따라서 앞으로 run-sequence 모듈을 사용하지 않아도 된다.
parallel 함수는 Task를 병렬로 실행하는데 기존 gulp.task(‘build’, [‘html’, ‘css’]) 방식의 실행 순서에 대응된다.
*/

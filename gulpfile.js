const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const browserSync = require('browser-sync').create()
const concatCSS = require('gulp-concat-css')
const clean = require('gulp-clean-css')
const reload = browserSync.reload
const rename = require('gulp-rename')
const sass = require('gulp-sass')

const src = {
  styles: 'src/sass/**/*.scss',
  scripts: 'src/js/**/*.js',
  templates: ['templates/*.twig', '*.php']
}

gulp.task('styles', () => {
  gulp.src(src.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(concatCSS('style.css'))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(clean())
    .pipe(gulp.dest('./'))
    .pipe(reload({ stream: true}))
})

gulp.task('scripts', () =>
  gulp.src(src.scripts)
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('./static'))
  .pipe(reload({ stream: true}))
)

gulp.task('default', ['styles', 'scripts'])

gulp.task('serve', ['styles', 'scripts'], () => {
  browserSync.init({
    proxy: 'lumberjack.dev'
  })

  gulp.watch(src.styles, ['styles'])
  gulp.watch(src.scripts, ['scripts'])
  gulp.watch(src.templates).on('change', reload)
})
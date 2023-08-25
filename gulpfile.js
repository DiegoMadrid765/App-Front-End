const { src, dest, watch, series, parallel } = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');

function css(done) {
    src('src/scss/base/app.scss').pipe(sass())
        .pipe(postcss([cssnano()]))

    .pipe(dest('src'))

    done();
}

function dev() {
    watch('src/scss/base/app.scss', css);
}

exports.dev = dev;
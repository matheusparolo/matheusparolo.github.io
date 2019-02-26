// Init
const {src, dest, series} = require('gulp'),
      {init, write}     = require('gulp-sourcemaps'),
      pug               = require('gulp-pug'),
      minifyHTML        = require("gulp-html-minifier"),
      stylus            = require("gulp-stylus"),
      minifyCSS         = require('gulp-csso'),
      autoPrefixer      = require('gulp-autoprefixer'),
      babel             = require('gulp-babel');
      rcs               = require('gulp-rcs');

let minifyHtmlOptions = {

    quoteCharacter : "'",
    collapseInlineTagWhitespace : true,
    collapseWhitespace : true,
    removeComments : true,
    removeEmptyAttributes : true,
    removeRedundantAttributes : true,
    removeScriptTypeAttributes : true,
    removeStyleLinkTypeAttributes : true,

},
    autoPrefixerOptions = {
    browsers: [
        "last 4 version",
        "> 1%",
        "not dead",
        "ie > 8",
    ],
    cascade: false
},
    rcsOptions = {
        exclude: ['level-1', 'level-2', 'level-3', 'level-4']
    };

// Tasks
let html         = () => {

    return src('index.pug')
        .pipe(pug())
        .pipe(minifyHTML(minifyHtmlOptions))
        .pipe(rcs(rcsOptions))
        .pipe(dest('.'));

};
let css          = () => {

    return src('assets/css/src/*/*.styl')
        .pipe(init())
        .pipe(stylus())
        .pipe(minifyCSS())
        .pipe(autoPrefixer(autoPrefixerOptions))
        .pipe(rcs(rcsOptions))
        .pipe(write("."))
        .pipe(dest('assets/css/build/'));

};
let cssExternal  = () => {

    return src("assets/css/src/external/*.css")
        .pipe(rcs(rcsOptions))
        .pipe(dest("assets/css/build/external"));

};
let js           = () => {

    return src("assets/js/src/*/*.js", {ignore: "assets/js/src/external/zepto.min.js"})
        .pipe(init())
        .pipe(babel({presets : ["@babel/env", "minify"]}))
        .pipe(rcs(rcsOptions))
        .pipe(write("."))
        .pipe(dest("assets/js/build"));

};
let jsExternal   = () => {

    return src("assets/js/src/external/*.js")
        .pipe(rcs(rcsOptions))
        .pipe(dest("assets/js/build/external"))

};

let dev_html         = () => {

    return src('index.pug')
        .pipe(pug())
        .pipe(minifyHTML(minifyHtmlOptions))
        .pipe(dest('.'));

};
let dev_css          = () => {

    return src('assets/css/src/*/*.styl')
        .pipe(init())
        .pipe(stylus())
        .pipe(minifyCSS())
        .pipe(autoPrefixer(autoPrefixerOptions))
        .pipe(write("."))
        .pipe(dest('assets/css/build/'));

};
let dev_cssExternal  = () => {

    return src("assets/css/src/external/*.css")
        .pipe(dest("assets/css/build/external"));

};
let dev_js           = () => {

    return src("assets/js/src/*/*.js", {ignore: "assets/js/src/external/zepto.min.js"})
        .pipe(init())
        .pipe(babel({presets : ["@babel/env", "minify"]}))
        .pipe(write("."))
        .pipe(dest("assets/js/build"));

};
let dev_jsExternal   = () => {

    return src("assets/js/src/external/*.js")
        .pipe(dest("assets/js/build/external"))

};

// Exports
exports.html         = html;
exports.css          = css;
exports.cssExternal  = cssExternal;
exports.js           = js;
exports.jsExternal   = jsExternal;

exports.dev_html         = dev_html;
exports.dev_css          = dev_css;
exports.dev_cssExternal  = dev_cssExternal;
exports.dev_js           = dev_js;
exports.dev_jsExternal   = dev_jsExternal;

exports.default = series(css, cssExternal, js, jsExternal, html);
exports.dev = series(dev_css, dev_cssExternal, dev_js, dev_jsExternal, dev_html);
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = htmlRunner;

var _htmlMinifier = require("html-minifier");

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Process html
 * @param {string} src The source file
 * @param {string} out The processed output file
 */
function htmlRunner(src, out) {
  var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

  var _cb = typeof cb === 'function' ? cb : function () {};

  _fs["default"].readFile(src, function (err, data) {
    if (err) {
      throw err;
    }

    var result = (0, _htmlMinifier.minify)(data.toString(), {
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyElements: true,
      removeEmptyAttributes: true,
      removeOptionalTags: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeTagWhitespace: true,
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      minifyURLs: true
    });

    _fs["default"].writeFile(out, "".concat(result, "\n"), function (err) {
      if (err) {
        throw err;
      }
    });

    return _cb();
  });
}
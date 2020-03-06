"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = sassRunner;

var _nodeSass = _interopRequireDefault(require("node-sass"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Process scss & sass
 * @param {string} src The source file
 * @param {string} out The processed output file
 */
function sassRunner(src, out) {
  _fs["default"].readFile(src, function (err) {
    if (err) {
      throw err;
    }

    _nodeSass["default"].render({
      file: src,
      indentType: 'tab',
      outFile: out,
      outputStyle: 'expanded',
      sourceMap: true
    }, function (err, result) {
      if (err) {
        throw err;
      }

      _fs["default"].writeFile(out, result.css, function (err) {
        if (err) {
          throw err;
        }
      });

      if (result.map) {
        _fs["default"].writeFile("".concat(out, ".map"), result.map, function (err) {
          if (err) {
            throw err;
          }
        });
      }
    });
  });
}
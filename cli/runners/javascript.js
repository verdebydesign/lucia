"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = jsRunner;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// require babel with commonjs since this code is being transpiled also
// do not use es-module import
var babel = require('@babel/core');

/**
 * Process javascript
 * @param {string} src The source file
 * @param {string} out The processed output file
 */
function jsRunner(src, out) {
  var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

  var _cb = typeof cb === 'function' ? cb : function () {};

  _fs["default"].readFile(src, function (err, data) {
    if (err) {
      throw err;
    }

    babel.transformAsync(data, {
      sourceMaps: true,
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-syntax-optional-chaining']
    }).then(function (result) {
      _fs["default"].writeFile(out, "".concat(result.code, "\n"), function (err) {
        if (err) {
          throw err;
        }
      });

      if (result.map) {
        _fs["default"].writeFile("".concat(out, ".map"), result.map.mappings, function (err) {
          if (err) {
            throw err;
          }
        });
      }

      return _cb();
    })["catch"](console.error);
  });
}
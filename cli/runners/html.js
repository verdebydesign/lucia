"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = htmlRunner;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Process html
 * @param {string} src The source file
 * @param {string} out The processed output file
 */
function htmlRunner(src, out) {
  _fs["default"].readFile(src, function (err, data) {
    if (err) {
      throw err;
    }
  });
}
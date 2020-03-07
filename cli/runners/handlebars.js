"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = hbsRunner;

var _handlebars = _interopRequireDefault(require("handlebars"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Process handlebars
 * @param {string} src The source file
 * @param {string} out The processed output file
 * @param {string} dataPath The path to the template data
 */
function hbsRunner(src, out) {
  var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  var dataPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var _cb = typeof cb === 'function' ? cb : function () {};

  _fs["default"].readFile(src, function (err, data) {
    if (err) {
      throw err;
    }

    var template = _handlebars["default"].compile(data.toString(), {});

    var templateData = require(_path["default"].resolve(dataPath));

    if (Object.entries(templateData).length && templateData["default"]) {
      templateData = templateData["default"];
    }

    if (dataPath.length) {
      var result = template(templateData, {});
      result.length && _fs["default"].writeFile(out, result, function (err) {
        if (err) {
          throw err;
        }
      });
    }

    return _cb();
  });
}
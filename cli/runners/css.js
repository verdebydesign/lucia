"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = cssRunner;

var _postcss = _interopRequireDefault(require("postcss"));

var _autoprefixer = _interopRequireDefault(require("autoprefixer"));

var _precss = _interopRequireDefault(require("precss"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Process css
 * @param {string} src The source css file
 * @param {string} out The processed output css file
 */
function cssRunner(src, out) {
  _fs["default"].readFile(src, function (err, data) {
    if (err) {
      throw err;
    }

    (0, _postcss["default"])([_precss["default"], _autoprefixer["default"]]).process(data, {
      from: src,
      to: out,
      map: {
        inline: false
      }
    }).then(function (result) {
      _fs["default"].writeFile(out, "".concat(result.css, "\n"), function (err) {
        if (err) {
          throw err;
        }
      });

      if (result.map) {
        _fs["default"].writeFile("".concat(out, ".map"), result.map.toString(), function (err) {
          if (err) {
            throw err;
          }
        });
      }
    })["catch"](console.error);
  });
}
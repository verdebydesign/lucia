"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _css = _interopRequireDefault(require("./css"));

var _javascript = _interopRequireDefault(require("./javascript"));

var _sass = _interopRequireDefault(require("./sass"));

var _html = _interopRequireDefault(require("./html"));

var _handlebars = _interopRequireDefault(require("./handlebars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var runners = function runners(config) {
  var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var extension = config.extension,
      src = config.src,
      out = config.out,
      templateDataPath = config.templateDataPath;

  switch (extension) {
    case '.html':
      (0, _html["default"])(src, out, cb);
      break;

    case '.css':
      (0, _css["default"])(src, out, cb);
      break;

    case '.js':
      (0, _javascript["default"])(src, out, cb);
      break;

    case '.sass':
      (0, _sass["default"])(src, out, cb);
      break;

    case '.scss':
      (0, _sass["default"])(src, out, cb);
      break;

    case '.hbs':
      (0, _handlebars["default"])(src, out, cb, templateDataPath);
      break;
  }
};

var _default = runners;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isKnownExt = isKnownExt;
exports.transpileJavascript = transpileJavascript;
exports.help = help;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _runners = _interopRequireDefault(require("./runners"));

var _settings = _interopRequireDefault(require("./settings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isKnownExt(ext) {
  var list = ['.css', '.sass', '.scss', '.js', '.html', '.hbs'];
  return list.includes(ext);
}

function transpileJavascript(src, out) {
  var _path$parse = _path["default"].parse(src),
      base = _path$parse.base;

  var outPath = out ? out : _path["default"].join(_settings["default"]["default"].tmpFolder, base);

  var _path$parse2 = _path["default"].parse(outPath),
      outDir = _path$parse2.dir; // check temporary dir for creation


  if (!_fs["default"].existsSync(outDir)) {
    _fs["default"].mkdirSync(outDir, {
      recursive: true
    });
  } // transpile code to the temporary location


  (0, _runners["default"])({
    extension: '.js',
    src: _path["default"].normalize(src),
    out: outPath
  }); // use the new location of the js data

  return outPath;
} // Arguments callbacks


function help() {
  console.log(['Lucia. A compiler.', '', '-e, --exp\t\tThe file extension', '-o, --out\t\tThe compiled output', '', 'Misc', '-h, --help\t\tcommand\'s help', '', 'Get involved\t\thttps://github.com/verdebydesign/lucia'].join('\n'));
}
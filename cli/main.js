"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = main;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _runners = _interopRequireDefault(require("./runners"));

var _helpers = require("./helpers");

var _settings = _interopRequireDefault(require("./settings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function main(args) {
  var inputPath = args['-i'] || args.input[0];
  var definedExt = args['-e'];

  var srcExt = _path["default"].extname(inputPath || '');

  if (srcExt.length) {
    // get the source file basename
    var srcBase = _path["default"].basename(inputPath);

    if (definedExt && ".".concat(definedExt) !== srcExt) {
      // eslint-disable-next-line
      process.exit(1);
    } // check if the user provided output path or use default


    var outputPath = args['-o'] && _path["default"].normalize(args['-o']) || args.input[1] && _path["default"].normalize(args.input[1]) || _path["default"].join(_settings["default"]["default"].outputFolder, srcBase); // if the extension provided is a known extension, continue


    if ((0, _helpers.isKnownExt)(srcExt)) {
      var _path$parse = _path["default"].parse(outputPath),
          oDir = _path$parse.dir,
          oExt = _path$parse.ext,
          oName = _path$parse.name; // if no output directory is provided, use the default


      if (!oDir.length) {
        outputPath = _path["default"].join(_settings["default"]["default"].outputFolder, outputPath);
      } // get the path dirname again here, in case it was fixed by the initial directory check


      var actualOdir = _path["default"].dirname(outputPath); // if no output extension is provided, use the src file extension
      // except for specific extensions, such as '.scss'


      if (!oExt.length) {
        outputPath = _path["default"].join(actualOdir, "".concat(oName).concat(_settings["default"].outputExtensionFrom[srcExt] || srcExt));
      } // verify if the output extension is different from the input extension
      // use correct extension, if they differ


      if (oExt && srcExt !== oExt) {
        outputPath = _path["default"].join(actualOdir, "".concat(oName).concat(_settings["default"].outputExtensionFrom[srcExt] || srcExt));
      } // if the extensions match but they need to always be compiled to something different
      // such as '.scss' to '.css'


      if (srcExt === oExt && _settings["default"].outputExtensionFrom[srcExt]) {
        outputPath = _path["default"].join(actualOdir, "".concat(oName).concat(_settings["default"].outputExtensionFrom[srcExt]));
      } // if an output directory is found, check for creation


      actualOdir.length && _fs["default"].exists(actualOdir, function (exists) {
        if (!exists) {
          _fs["default"].mkdir(actualOdir, {
            recursive: true
          }, function (err) {
            if (err) {
              throw err;
            }
          });
        }
      }); // if handlebars, check for template data path

      var templateDataPath = args['--hbs-data'] || ''; // if the template file for handlebars is a js file, transpile it

      var templateDataPathExt = _path["default"].extname(templateDataPath);

      if (templateDataPathExt === '.js') {
        templateDataPath = (0, _helpers.transpileJavascript)(templateDataPath);
      } // use the correct runner and output a result


      (0, _runners["default"])({
        extension: srcExt,
        src: _path["default"].normalize(inputPath),
        out: outputPath,
        templateDataPath: templateDataPath
      });
    }
  }
}
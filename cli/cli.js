#! /usr/bin/env node
"use strict";

var _car = _interopRequireDefault(require("@verdebydesign/car"));

var _main = _interopRequireDefault(require("./main"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var defined = {
  '-h': {
    flag: true,
    cb: _helpers.help,
    combine: false,
    longform: '--help'
  },
  '-e': {
    "var": true,
    longform: '--ext'
  },
  '-o': {
    "var": true,
    longform: '--out'
  },
  '-i': {
    "var": true,
    longform: '--input'
  },
  '--hbs-data': {
    "var": true
  }
};
(0, _main["default"])((0, _car["default"])(defined, process.stdout.write));
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isKnownExt = isKnownExt;
exports.help = help;

function isKnownExt(ext) {
  var list = ['.css', '.sass', '.scss', '.js', '.html', '.hbs'];
  return list.includes(ext);
} // Arguments callbacks


function help() {
  process.stdout.write(['Lucia. A compiler.', '', '-e, --exp              The file extension', '-o, --out              The compiled output', '', 'Misc', '-h, --help             command\'s help', '', 'Get involved           https://github.com/verdebydesign/lucia'].join('\n'));
}
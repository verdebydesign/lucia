import sass from 'node-sass';

import fs from 'fs';

/**
 * Process scss & sass
 * @param {string} src The source file
 * @param {string} out The processed output file
 * @param {(err) => {}} cb Run on success or error
 */
export default function sassRunner(src, out, cb = () => {}) {
	const _cb = typeof cb === 'function' ? cb : () => {};

	fs.readFile(src, err => {
		if (err) {
			return cb(err);
		}

		sass.render({
			file: src,
			indentType: 'tab',
			outFile: out,
			outputStyle: 'expanded',
			sourceMap: true
		}, (err, result) => {
			if (err) {
				return cb(err);
			}

			fs.writeFile(out, result.css, err => {
				if (err) {
					return cb(err);
				}
			});
			if (result.map) {
				fs.writeFile(`${out}.map`, result.map, err => {
					if (err) {
						return cb(err);
					}
				});
			}

			return _cb(null);
		});
	});
}

// require babel with commonjs since this code is being transpiled also
// do not use es-module import
const babel = require('@babel/core');

import fs from 'fs';

/**
 * Process javascript
 * @param {string} src The source file
 * @param {string} out The processed output file
 * @param {(err) => {}} cb Run on success or error
 *
 */
export default function jsRunner(src, out, cb = () => {}) {
	const _cb = typeof cb === 'function' ? cb : () => {};

	fs.readFile(src, (err, data) => {
		if (err) {
			return cb(err);
		}

		babel.transformAsync(data, {
			sourceMaps: true,
			presets: ['@babel/preset-env'],
			plugins: [
				'@babel/plugin-syntax-optional-chaining'
			]
		})
			.then(result => {
				fs.writeFile(out, `${result.code}\n`, err => {
					if (err) {
						return cb(err);
					}
				});
				if (result.map) {
					fs.writeFile(`${out}.map`, result.map.mappings, err => {
						if (err) {
							return cb(err);
						}
					});
				}

				return _cb(null);
			})
			.catch(cb);
	});
}

import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import precss from 'precss';

import fs from 'fs';

/**
 * Process css
 * @param {string} src The source css file
 * @param {string} out The processed output css file
 * @param {(err) => {}} cb Run on success or error
 */
export default function cssRunner(src, out, cb = () => {}) {
	const _cb = typeof cb === 'function' ? cb : () => {};

	fs.readFile(src, (err, data) => {
		if (err) {
			return cb(err);
		}

		postcss([precss, autoprefixer])
			.process(data, {
				from: src,
				to: out,
				map: {
					inline: false
				}
			})
			.then(result => {
				fs.writeFile(out, `${result.css}\n`, err => {
					if (err) {
						return cb(err);
					}
				});
				if (result.map) {
					fs.writeFile(`${out}.map`, result.map.toString(), err => {
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

import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import precss from 'precss';

import fs from 'fs';

/**
 * Process css
 * @param {string} src The source css file
 * @param {string} out The processed output css file
 */
export default function cssRunner(src, out) {
	fs.readFile(src, (err, data) => {
		if (err) {
			throw err;
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
						throw err;
					}
				});
				if (result.map) {
					fs.writeFile(`${out}.map`, result.map.toString(), err => {
						if (err) {
							throw err;
						}
					});
				}
			})
			.catch(console.error);
	});
}

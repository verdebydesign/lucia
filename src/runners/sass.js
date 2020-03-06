import sass from 'node-sass';

import fs from 'fs';

/**
 * Process scss & sass
 * @param {string} src The source file
 * @param {string} out The processed output file
 */
export default function sassRunner(src, out) {
	fs.readFile(src, err => {
		if (err) {
			throw err;
		}

		sass.render({
			file: src,
			indentType: 'tab',
			outFile: out,
			outputStyle: 'expanded',
			sourceMap: true
		}, (err, result) => {
			if (err) {
				throw err;
			}

			fs.writeFile(out, result.css, err => {
				if (err) {
					throw err;
				}
			});
			if (result.map) {
				fs.writeFile(`${out}.map`, result.map, err => {
					if (err) {
						throw err;
					}
				});
			}
		});
	});
}

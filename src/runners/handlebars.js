import handlebars from 'handlebars';

import fs from 'fs';
import path from 'path';

/**
 * Process handlebars
 * @param {string} src The source file
 * @param {string} out The processed output file
 * @param {string} dataPath The path to the template data
 */
export default function hbsRunner(src, out, dataPath = {}) {
	fs.readFile(src, (err, data) => {
		if (err) {
			throw err;
		}

		const template = handlebars.compile(data.toString(), {});

		if (dataPath.length) {
			const result = template(require(path.resolve(dataPath)), {});

			result.length && fs.writeFile(out, result, err => {
				if (err) {
					throw err;
				}
			});
		}
	});
}

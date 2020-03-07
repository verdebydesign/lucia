import handlebars from 'handlebars';

import fs from 'fs';
import path from 'path';

/**
 * Process handlebars
 * @param {string} src The source file
 * @param {string} out The processed output file
 * @param {string} dataPath The path to the template data
 */
export default function hbsRunner(src, out, cb = () => {}, dataPath = {}) {
	const _cb = typeof cb === 'function' ? cb : () => {};

	fs.readFile(src, (err, data) => {
		if (err) {
			throw err;
		}

		const template = handlebars.compile(data.toString(), {});
		let templateData = require(path.resolve(dataPath));

		if (Object.entries(templateData).length && templateData.default) {
			templateData = templateData.default;
		}

		if (dataPath.length) {
			const result = template(templateData, {});

			result.length && fs.writeFile(out, result, err => {
				if (err) {
					throw err;
				}
			});
		}

		return _cb();
	});
}

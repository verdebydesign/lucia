import handlebars from 'handlebars';

import fs from 'fs';
import path from 'path';

/**
 * Process handlebars
 * @param {string} src The source file
 * @param {string} out The processed output file
 * @param {string} dataPath The path to the template data
 * @param {(err) => {}} cb Run on success or error
 */
export default function hbsRunner(src, out, dataPath = {}, cb = () => {}) {
	const _cb = typeof cb === 'function' ? cb : () => {};

	fs.readFile(src, (err, data) => {
		if (err) {
			return _cb(err);
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
					return _cb(err);
				}
			});
		}

		return _cb(null);
	});
}

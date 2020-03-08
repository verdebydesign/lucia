import { minify } from 'html-minifier';

import fs from 'fs';

/**
 * Process html
 * @param {string} src The source file
 * @param {string} out The processed output file
 * @param {(err) => {}} cb Run on success or error
 */
export default function htmlRunner(src, out, cb = () => {}) {
	const _cb = typeof cb === 'function' ? cb : () => {};

	fs.readFile(src, (err, data) => {
		if (err) {
			return cb(err);
		}

		const result = minify(data.toString(), {
			removeAttributeQuotes: true,
			removeComments: true,
			removeEmptyElements: true,
			removeEmptyAttributes: true,
			removeOptionalTags: true,
			removeRedundantAttributes: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true,
			removeTagWhitespace: true,
			collapseWhitespace: true,
			minifyCSS: true,
			minifyJS: true,
			minifyURLs: true
		});

		fs.writeFile(out, `${result}\n`, err => {
			if (err) {
				return cb(err);
			}
		});

		return _cb(null);
	});
}

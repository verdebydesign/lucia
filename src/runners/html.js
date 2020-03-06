import { minify } from 'html-minifier';

import fs from 'fs';

/**
 * Process html
 * @param {string} src The source file
 * @param {string} out The processed output file
 */
export default function htmlRunner(src, out) {
	fs.readFile(src, (err, data) => {
		if (err) {
			throw err;
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
				throw err;
			}
		});
	});
}

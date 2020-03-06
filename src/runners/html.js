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
	});
}

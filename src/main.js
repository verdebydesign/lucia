import path from 'path';
import fs from 'fs';

import runners from './runners';
import { isKnownExt, transpileJavascript } from './helpers';
import settings from './settings';

export default function main(args) {
	const inputPath = args['-i'] || args.input[0];
	const definedExt = args['-e'];

	const srcExt = path.extname(inputPath || '');

	if (srcExt.length) {
		// get the source file basename
		const srcBase = path.basename(inputPath);

		if (definedExt && `.${definedExt}` !== srcExt) {
			// eslint-disable-next-line
			process.exit(1);
		}

		// check if the user provided output path or use default
		let outputPath
    = args['-o'] && path.normalize(args['-o'])
    || args.input[1] && path.normalize(args.input[1])
    || path.join(settings.default.outputFolder, srcBase);

		// if the extension provided is a known extension, continue
		if (isKnownExt(srcExt)) {
			const { dir: oDir, ext: oExt, name: oName } = path.parse(outputPath);

			// if no output directory is provided, use the default
			if (!oDir.length) {
				outputPath = path.join(settings.default.outputFolder, outputPath);
			}

			// get the path dirname again here, in case it was fixed by the initial directory check
			let actualOdir = path.dirname(outputPath);

			// if no output extension is provided, use the src file extension
			// except for specific extensions, such as '.scss'
			if (!oExt.length) {
				outputPath = path.join(actualOdir, `${oName}${settings.outputExtensionFrom[srcExt] || srcExt}`);
			}

			// verify if the output extension is different from the input extension
			// use correct extension, if they differ
			if (oExt && srcExt !== oExt) {
				outputPath = path.join(actualOdir, `${oName}${settings.outputExtensionFrom[srcExt] || srcExt}`);
			}

			// if the extensions match but they need to always be compiled to something different
			// such as '.scss' to '.css'
			if (srcExt === oExt && settings.outputExtensionFrom[srcExt]) {
				outputPath = path.join(actualOdir, `${oName}${settings.outputExtensionFrom[srcExt]}`);
			}

			// if an output directory is found, check for creation
			actualOdir.length && fs.exists(actualOdir, exists => {
				if (!exists) {
					fs.mkdir(actualOdir, { recursive: true }, err => {
						if (err) {
							throw err;
						}
					});
				}
			});

			// if handlebars, check for template data path
			let templateDataPath = args['--hbs-data'] || '';

			// if the template file for handlebars is a js file, transpile it
			const templateDataPathExt = path.extname(templateDataPath);

			if (templateDataPathExt === '.js') {
				templateDataPath = transpileJavascript(templateDataPath);
			}

			// use the correct runner and output a result
			runners({
				extension: srcExt,
				src: path.normalize(inputPath),
				out: outputPath,
				templateDataPath
			});
		}
	}
}

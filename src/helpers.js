import path from 'path';
import fs from 'fs';

import runners from './runners';
import settings from './settings';

export function isKnownExt(ext) {
	const list = [
		'.css',
		'.sass',
		'.scss',
		'.js',
		'.html',
		'.hbs'
	];

	return list.includes(ext);
}

export function transpileJavascript(src, out) {
	const { base } = path.parse(src);
	const outPath = out ? out : path.join(settings.default.tmpFolder, base);
	const { dir: outDir } = path.parse(outPath);

	// check temporary dir for creation
	if (!fs.existsSync(outDir)) {
		fs.mkdirSync(outDir, { recursive: true });
	}

	// transpile code to the temporary location
	runners({
		extension: '.js',
		src: path.normalize(src),
		out: outPath
	});

	// use the new location of the js data
	return outPath;
}

// Arguments callbacks

export function help() {
	console.log([
		'Lucia. A compiler.',
		'',
		'-e, --exp\t\tThe file extension',
		'-o, --out\t\tThe compiled output',
		'',
		'Misc',
		'-h, --help\t\tcommand\'s help',
		'',
		'Get involved\t\thttps://github.com/verdebydesign/lucia'
	].join('\n'));
}

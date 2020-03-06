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

// Arguments callbacks

export function help() {
	process.stdout.write([
		'Lucia. A compiler.',
		'',
		'-e, --exp              The file extension',
		'-o, --out              The compiled output',
		'',
		'Misc',
		'-h, --help             command\'s help',
		'',
		'Get involved           https://github.com/verdebydesign/lucia'
	].join('\n'));
}

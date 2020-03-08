#! /usr/bin/env node

import CAR from '@verdebydesign/car';
import main from './main';
import { help } from './helpers';

const defined = {
	'-h': {
		flag: true,
		cb: help,
		combine: false,
		otherforms: ['h', 'help', '--help']
	},
	'-e': {
		var: true,
		otherforms: ['e', '--ext', 'ext', 'extension']
	},
	'-o': {
		var: true,
		otherforms: ['o', '--out', 'output']
	},
	'-i': {
		var: true,
		otherforms: ['i', '--input', 'input']
	},
	'--hbs-data': {
		var: true,
		otherforms: ['hbst']
	}
};

main(CAR(defined, process.stdout.write));

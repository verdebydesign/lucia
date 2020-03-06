#! /usr/bin/env node

import CAR from '@verdebydesign/car';
import main from './main';
import { help } from './helpers';

const defined = {
	'-h': {
		flag: true,
		cb: help,
		combine: false,
		longform: '--help'
	},
	'-e': {
		var: true,
		longform: '--ext'
	},
	'-o': {
		var: true,
		longform: '--out'
	},
	'-i': {
		var: true,
		longform: '--input'
	},
	'--hbs-data': {
		var: true
	}
};

main(CAR(defined, process.stdout.write));

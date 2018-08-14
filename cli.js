#!/usr/bin/env node

'use strict';
const path = require('path');
const updateNotifier = require('update-notifier');
const meow = require('meow');
const mkdirp = require('mkdirp');
const tar = require('tar');

const cli = meow(`
	Usage
	  $ tar-pack -f <file> <path> …

	Options
	  -f, --file    output file

	Examples
	  $ tar-pack -f test.tar.gz ./test
`, {
	string: [
		'_',
		'file'
	],
	alias: {
		f: 'file'
	}
});

updateNotifier({
	pkg: cli.pkg
}).notify();

function pack(src, flags) {
	const dirname = path.dirname(flags.file);

	mkdirp.sync(dirname);
	return tar.create({
		gzip: true,
		...flags,
		sync: true
	}, src);
}

if (cli.input.length === 0) {
	console.error('Specify at least one path');
	process.exit(1);
}

if (!cli.flags.file) {
	console.error('Need specify file path');
	process.exit(1);
}

pack(cli.input, cli.flags);

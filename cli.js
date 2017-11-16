#!/usr/bin/env node

'use strict';
const path = require('path');
const updateNotifier = require('update-notifier');
const meow = require('meow');
const tar = require('tar-pack');
const mkdirp = require('mkdirp');

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

function pack(src, dist) {
	mkdirp.sync(path.dirname(dist));
	return new Promise((resolve, reject) => {
		tar.pack(src, {
			fromBase: true
		})
		.pipe(require('fs').createWriteStream(dist))
		.on('error', err => {
			reject(err);
		})
		.on('close', () => {
			resolve();
		});
	});
}

if (cli.input.length === 0) {
	console.error('Specify at least one path');
	process.exit(1);
}

pack(cli.input[0], cli.flags.file);

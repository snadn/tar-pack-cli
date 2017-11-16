import fs from 'fs';
import path from 'path';
import test from 'ava';
import execa from 'execa';

test(async t => {
	const filename = 'test.tgz';
	const del = path.resolve('./node_modules/.bin/del-cli');
	const tar = path.resolve('./cli.js');
	await execa.shell(`${del} ${filename} && node ${tar} -f ${filename} .`);
	t.true(fs.existsSync(filename));
	await execa.shell(`${del} ${filename}`);
});

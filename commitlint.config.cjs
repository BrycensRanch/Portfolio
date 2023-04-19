/* eslint-disable unicorn/prevent-abbreviations */
// This file is used by commitlint to validate commit messages.
// It was adapted for monorepos
// While we're technically not a monorepo, it keeps things consistent
const fs = require('node:fs');
const path = require('node:path');

const { dirname: dirName, basename: baseName } = require('node:path');
const { lstatSync: fileInfo } = require('node:fs');

const readdirSync = (p, a = [], ignored = ['node_modules', '.git', '.next', '.husky']) => {
	if (fs.statSync(p).isDirectory())
		fs.readdirSync(p)
			.filter(file => {
				return ignored?.includes(baseName(file)) && !ignored?.includes(file);
			})

			.map(f => readdirSync(a[a.push(path.join(p, f)) - 1], a, ignored));
	return a.filter(file => ignored?.includes(baseName(file)) && !ignored?.includes(file));
};

const DEFAULT_SCOPES = [
	'repo',
	'frontend',
	'backend',
	'commitlint',
	'sec',
	'security',
	'deps',
	'dependencies',
	'release',
	'actions',
	'docker',
	'config',
];
const blacklistedScopes = new Set(['src', 'next', 'dist', 'out']);

const dirNames = readdirSync('./')
	.map(e => dirName(e))
	.map(entry => {
		const newEntry = fileInfo(entry);
		newEntry.name = baseName(entry);
		return newEntry;
	})
	.map(dir => dir.name)
	.map(s => {
		if (s.charAt(0) === '.') {
			return s.slice(1);
		}
		return s;
	})
	.map(s => {
		if (s.includes('-')) {
			return s.split('-');
		}
		return s;
	})
	.flat(Number.POSITIVE_INFINITY);

const scopes = [...new Set([...DEFAULT_SCOPES, ...dirNames])]
	.map(s => {
		return s.replace(/_/g, '');
	})
	.filter(s => {
		return s.length > 0;
	})
	.filter(s => !blacklistedScopes.has(s));

console.log(scopes);
module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'scope-enum': [2, 'always', scopes],
	},
};

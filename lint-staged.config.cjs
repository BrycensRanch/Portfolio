module.exports = {
	'*.{js,jsx,mjs,cjs,cts,ts,tsx}': ['eslint --fix', 'prettier --write'],
	'**/*.ts?(x)': () => 'pnpm build',
	'*.{json,md,mdx,yaml,yml,css}': 'prettier --write',
};

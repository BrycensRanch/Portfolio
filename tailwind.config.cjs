const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'media',

	theme: {
		fontFamily: {
			satoshi: ['Satoshi', 'sans-serif'],
		},
		screens: {
			'2xsm': '375px',
			xsm: '425px',
			'3xl': '2000px',
			...defaultTheme.screens,
		},
		extend: {
			fontSize: {
				xs: '0.75rem',
				sm: '0.875rem',
				base: '1rem',
				lg: '1.125rem',
				xl: '1.25rem',
				'2xl': '1.5rem',
				'3xl': '1.875rem',
				'4xl': '2.25rem',
				'5xl': '3rem',
				'6xl': '4rem',
			},
		},
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
};

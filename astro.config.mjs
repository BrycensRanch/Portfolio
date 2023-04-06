import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import robotsTxt from 'astro-robots-txt';
import compressor from 'astro-compressor';
import critters from 'astro-critters';
import image from '@astrojs/image';
import fonts from 'astro-fonts-next';

import purgecss from 'astro-purgecss';

// https://astro.build/config
export default defineConfig({
	site: 'https://brycens.tech',
	integrations: [
		fonts({ url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap' }),
		mdx(),
		sitemap(),
		tailwind(),
		robotsTxt(),
		critters(),
		purgecss(),
		compressor(),
		image({
			serviceEntryPoint: '@astrojs/image/sharp',
		}),
	],
});

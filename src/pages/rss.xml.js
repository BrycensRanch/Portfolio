import rss from '@astrojs/rss';
import { SITE_TITLE, SITE_DESCRIPTION } from '../config';

export const get = async _context => {
	const blogPosts = await import.meta.glob('./blog/**/*.{md,mdx}');

	// TODO: #21 Figure out how to filter posts that aren't hidden

	rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: import.meta.env.SITE,
		items: blogPosts,
		customData: `<language>en-us</language>`,
	});
};

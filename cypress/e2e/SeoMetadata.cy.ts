const notBeEmpty = 'not.be.empty';

describe('Seo metadata', () => {
	describe('Verify SEO Metadata', () => {
		it('should render SEO metadata on Index page', () => {
			cy.visit('/');

			// The Index page should have a page title
			cy.title().should(notBeEmpty);

			// The Index page should also contain a meta description for SEO
			cy.get('head meta[name="description"]').invoke('attr', 'content').should(notBeEmpty);
		});
		it('should render SEO metadata on Blog Post', () => {
			cy.visit('/blog/post4');

			// The Index page should have a page title
			cy.title().should(notBeEmpty);

			// The Index page should also contain a meta description for SEO
			cy.get('head meta[name="description"]').invoke('attr', 'content').should(notBeEmpty);
		});
	});
});

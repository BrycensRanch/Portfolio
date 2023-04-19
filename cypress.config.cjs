const { defineConfig } = require('cypress');

module.exports = defineConfig({
	env: {},
	e2e: {
		baseUrl: 'http://localhost:3000',
		setupNodeEvents(on, config) {
			// include any other plugin code...

			// It's IMPORTANT to return the config object
			// with any changed environment variables
			return config;
		},
	},
});

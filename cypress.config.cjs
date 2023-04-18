const { defineConfig } = require('cypress');
const codeCoverageTask = require('@cypress/code-coverage/task');

module.exports = defineConfig({
	env: {
		codeCoverage: {
			url: '/coverage',
			exclude: 'cypress/**/*.*',
		},
	},
	e2e: {
		baseUrl: 'http://localhost:3000',
		setupNodeEvents(on, config) {
			codeCoverageTask(on, config);
			// include any other plugin code...

			// It's IMPORTANT to return the config object
			// with any changed environment variables
			return config;
		},
	},
});

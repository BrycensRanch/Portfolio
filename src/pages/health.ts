// Headers are not exposewd in static (SSG) output mode. To enable headers: set `output: "server"` in your config file

export async function get({ params, request }) {
	return {
		body: JSON.stringify({
			statusCode: 200,
			statusText: 'OK',
			message: 'AOkay',
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	};
}

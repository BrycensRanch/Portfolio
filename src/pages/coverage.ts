// Headers are not exposewd in static (SSG) output mode. To enable headers: set `output: "server"` in your config file

export async function get({}) {
	return {
		body: JSON.stringify({
			// eslint-disable-next-line unicorn/no-null
			coverage: global.__coverage__ || null,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	};
}

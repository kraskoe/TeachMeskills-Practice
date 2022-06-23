export const server = (done) => {
	app.plugins.browsersync.init({
		server: {
			// baseDir: `dist`
			baseDir: `${app.path.build.html}`
			// baseDir: app.path.build.html
		},
		notify: false,
		port:3000,
	});
}
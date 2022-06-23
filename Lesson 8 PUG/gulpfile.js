//Main module
import gulp from "gulp";

//Path import
import { path } from "./gulp/config/path.js";

//Plugin import
import { plugins } from "./gulp/config/plugins.js";

//Global variable
global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	plugins: plugins,
	path: path,
	gulp: gulp,
}

//Task import
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprites } from "./gulp/tasks/svgSprites.js";

//Watcher
function watcher() {
	gulp.watch(path.watch.files, copy)
	gulp.watch(path.watch.html, html)
	gulp.watch(path.watch.scss, scss)
	gulp.watch(path.watch.js, js)
	gulp.watch(path.watch.images, images)
}

export { svgSprites };

//Fonts handler
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

//Main tasks
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

//Task scenarios
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);

//Export scenarios
export { dev }
export { build }

//Default scenario
gulp.task('default', dev);
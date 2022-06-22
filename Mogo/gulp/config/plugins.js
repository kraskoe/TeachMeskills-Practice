//Search and replace
import replace from "gulp-replace"; //Search&replace
import plumber from "gulp-plumber"; //Error handler
import notify from "gulp-notify"; //Messages
import browsersync from "browser-sync"; //Local server
import newer from "gulp-newer"; //Renewal chekout
import ifPlugin from "gulp-if"; //Conditionals

//Export object
export const plugins = {
	replace: replace,
	plumber: plumber,
	notify: notify,
	browsersync: browsersync,
	newer: newer,
	if: ifPlugin,
}
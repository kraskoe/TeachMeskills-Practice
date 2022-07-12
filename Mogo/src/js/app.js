import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

// --- SWIPER --- //
// import Swiper, { Navigation, Pagination } from 'swiper';
import Swiper from 'swiper/bundle';

// import styles bundle
// import 'swiper/css/bundle';
// import 'swiper/scss';
// import 'swiper/scss/autoplay';

const swiper = new Swiper('.swiper', {
	// modules: [Navigation, Pagination],
	loop: true,
	autoplay: {
		delay: 1500,
		disableOnInteraction: false
	},
	speed: 1000,
	// mousewheel: {
	// 	sensitivity: 1,
	// 	eventsTarget: ".swiper-slide"
	// },
	// effect: "fade",
	// fadeEffect: {
	// 	crossFade: true
	// },

	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});

// --- BURGER --- //
import "./modules/burger.js";

// --- FORM VALIDATION --- //
import {validateForm} from "./modules/validation.js";

document.addEventListener('DOMContentLoaded', validateForm());

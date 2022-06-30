import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

// --- SWIPER --- //
import Swiper, { Navigation, Pagination } from 'swiper';
// import Swiper from 'swiper/bundle';

// import styles bundle
// import 'swiper/css/bundle';
// import 'swiper/scss';

const swiper = new Swiper('.quotes__slider', {
	modules: [Navigation, Pagination],
	loop: true,

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
const burger = document.querySelector('.header__burger');
const menu = document.querySelector('.header__menu');
const banner = document.querySelector('.banner__wrapper');
let menuLinks = document.querySelectorAll('[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});
}

function onMenuLinkClick(e) {
	const menuLink = e.target;
	if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
		const gotoBlock = document.querySelector(menuLink.dataset.goto);
		const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY;
		// const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

		if (burger.classList.contains('_active') || menu.classList.contains('_active')) {
			burger.classList.remove('_active');
			menu.classList.remove('_active');
			banner.classList.remove('_active');
			document.body.classList.remove('_lock');
		}

		window.scrollTo({
			top: gotoBlockValue,
			behavior: "smooth"
		});
		e.preventDefault();
	}
}

if (burger) {
	burger.addEventListener("click", function () {
		burger.classList.toggle('_active');
		menu.classList.toggle('_active');
		banner.classList.toggle('_active');
		document.body.classList.toggle('_lock');
	});
}




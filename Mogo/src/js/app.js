import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

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
		burger.addEventListener("click", function() {
			burger.classList.toggle('_active');
			menu.classList.toggle('_active');
			banner.classList.toggle('_active');
			document.body.classList.toggle('_lock');
		});
}


// --- IBG --- //
function ibg() {
	let ibg = document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if(ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		};
	};
}
ibg();

// --- SLIDER --- //

const slider = document.querySelector('.reviews__block');
const sliderItems = document.querySelectorAll('.customer__col');
const sliderLine = document.querySelector('.customer');
const dots = document.querySelector('.customer__dots');

let listenerFlag = false;
let counter = 0;
let width;

// --- SLIDER MOBILE ON/OFF --- //

function sliderOn () {
	if (window.innerWidth > 1023.98) {
		if (!listenerFlag) {
			return;
		} else {
			slider.removeEventListener('touchstart', handleTouchStart, false);
			slider.removeEventListener('touchmove', handleTouchMove, false);
			listenerFlag = false;
			width = slider.offsetWidth;
			counter = 0;
			rollSlider();
			return;
		}
	} else {
		slider.addEventListener('touchstart', handleTouchStart, false);
		slider.addEventListener('touchmove', handleTouchMove, false);
		listenerFlag = true;
		width = slider.offsetWidth;
		rollSlider();
		return;
	}
}

function clearTransit() {
	dots.classList.remove('_transit');
}

// --- SLIDE LOGIC --- //
function rollSlider () {
	sliderLine.style.transform = 'translate(-' + counter*width + 'px)';
	dots.classList.add('_transit');
	setTimeout(clearTransit, 450);
}

// --- SWIPE LOGIC --- //
let x1 = y1 = null;

function handleTouchStart(event) {
	const firstTouch = event.touches[0];

	x1 = firstTouch.clientX;
	y1 = firstTouch.clientY;
}

function handleTouchMove(event) {
	if (!x1 || !y1) {
		return false;
	}

	let x2 = event.touches[0].clientX;
	let y2 = event.touches[0].clientY;

	let xDiff = x2 - x1;
	let yDiff = y2 - y1;

	if (Math.abs(xDiff) > Math.abs(yDiff)) {
		if (xDiff > 0) {
			counter--;
			if (counter <0) {
				counter = sliderItems.length - 1;
			}
			rollSlider();
		} else {
			counter++;
			if (counter >= sliderItems.length) {
				counter = 0;
			}
			rollSlider();
		}
	}

	x1 = null;
	y1 = null;
}

window.addEventListener('resize', sliderOn);
sliderOn();

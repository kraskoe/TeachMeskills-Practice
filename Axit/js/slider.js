// --- CONSTANTS & VARIABLES --- //

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
			// console.log('right');
			counter--;
			if (counter <0) {
				counter = sliderItems.length - 1;
			}
			rollSlider();
		} else {
			// console.log('left');
			counter++;
			if (counter >= sliderItems.length) {
				counter = 0;
			}
			rollSlider();
		}
	} else {
		// if (yDiff > 0) {
		// 	console.log('down');
		// } else {
		// 	console.log('up');
		// }
	}

	x1 = null;
	y1 = null;
}

// --- INIT --- //

window.addEventListener('resize', sliderOn);
sliderOn();

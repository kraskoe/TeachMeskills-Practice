"use strict"


let menuLinks = document.querySelectorAll('.header__link[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});
}

function onMenuLinkClick(e) {
	const menuLink = e.target;
	if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
		const gotoBlock = document.querySelector(menuLink.dataset.goto);
		const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;
		// const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

		if (burger.classList.contains('_active') || menu.classList.contains('_active')) {
			burger.classList.remove('_active');
			menu.classList.remove('_active');
			document.body.classList.remove('_lock');
		}

		window.scrollTo({
			top: gotoBlockValue,
			behavior: "smooth"
		});
		e.preventDefault();
	}
}

const burger = document.querySelector('.header__burger');
const menu = document.querySelector('.header__menu');
if (burger) {
		burger.addEventListener("click", function() {
				burger.classList.toggle('_active');
				menu.classList.toggle('_active');
				document.body.classList.toggle('_lock');
			});
		}


// --- Multy-level menu --- //
		// const isMobile = {
		// 	Android: function () {
		// 		return navigator.userAgent.match(/Android/i);
		// 	},
		// 	BlackBerry: function () {
		// 		return navigator.userAgent.match(/Blackberry/i);
		// 	},
		// 	iOS: function () {
		// 		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		// 	},
		// 	Opera: function () {
		// 		return navigator.userAgent.match(/Opera Mini/i);
		// 	},
		// 	Windows: function () {
		// 		return navigator.userAgent.match(/IEMobile/i);
		// 	},
		// 	any: function () {
		// 		return (
		// 			isMobile.Android() ||
		// 			isMobile.BlackBerry() ||
		// 			isMobile.iOS() ||
		// 			isMobile.Opera() ||
		// 			isMobile.Windows()
		// 		);
		// 	}
		// };

		// if (isMobile.any()) {
		// 	document.body.classList.add('_touch');

		// 	let menuArrows = document.querySelectorAll('.menu__arrow');
		// 	if (menuArrows.ltngth > 0) {
		// 		for (let index = 0; index < menuArrows.length; index++) {
		// 			const menuArrow = menuArrows[index];
		// 			menuArrow.addEventListener("click", function(e) {
		// 				menuArrow.parentElement.classList.toggle('_active');
		// 			});
		// 		}
		// 	}
		// } else {
		// 	document.body.classList.add('_pc');
		// }

const burger = document.querySelector('.header__burger');
if (burger) {
	const menu = document.querySelector('.header__menu');
	burger.addEventListener("click", function() {
		burger.classList.toggle('active');
		menu.classList.toggle('active');
		document.body.classList.toggle('lock');
	});
}

// --- jQuery ---
// $(document).ready(function() {
// 	$('.header__burger').click(function(event) {
// 		$('.header__burger,.header__menu').toggleClass('active');
// 		$('body').toggleClass('lock');
// 	});
// });
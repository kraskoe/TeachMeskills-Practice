import {userSignOut} from './auth';

function accessUserName() {
	const username = localStorage.getItem('username') || 'Guest';
	const nameInput = document.querySelector('.greeting__username');

	nameInput.setAttribute('readonly', 'readonly');
	nameInput.value = username;

	// nameInput.addEventListener('change', e => {
	// 	localStorage.setItem('username', e.target.value);
	// })
	// nameInput.addEventListener('keyup', e => {
	// 	if (e.code === 'Enter') {
	// 		localStorage.setItem('username', e.target.value);
	// 		nameInput.blur();
	// 	}
	// })
}

function buildGreetingSection() {
	const greetingSection = document.createElement('section');
	const greetingHeader = document.createElement('h2');
	const logOut = document.createElement('div');

	greetingSection.classList.add('greeting__section');
	greetingHeader.classList.add('greeting__header');
	greetingHeader.innerHTML =
		'Hello, <input type="text" class="greeting__username" placeholder="Type your name here"/>';
	logOut.classList.add('greeting__logout');
	logOut.innerHTML = 'Log out';
	greetingHeader.append(logOut);
	greetingSection.append(greetingHeader);

	logOut.addEventListener('click', userSignOut);

	return greetingSection;
}

export {accessUserName, buildGreetingSection};

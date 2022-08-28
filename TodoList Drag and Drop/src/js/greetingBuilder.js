export {accessUserName, buildGreetingSection};

function accessUserName() {
	const username = localStorage.getItem('username') || 'Guest';
	const nameInput = document.querySelector('.greeting__username');

	nameInput.value = username;

	nameInput.addEventListener('change', e => {
		localStorage.setItem('username', e.target.value);
	})
	nameInput.addEventListener('keyup', e => {
		if (e.code === 'Enter') {
			localStorage.setItem('username', e.target.value);
			nameInput.blur();
		}
	})
}

function buildGreetingSection() {
	const greetingSection = document.createElement('section');
	const greetingHeader = document.createElement('h2');

	greetingSection.classList.add('greeting__section');
	greetingHeader.classList.add('greeting__header');
	greetingHeader.innerHTML =
		'Hello, <input type="text" class="greeting__username" placeholder="Type your name here"/>';
	greetingSection.append(greetingHeader);

	return greetingSection;
}

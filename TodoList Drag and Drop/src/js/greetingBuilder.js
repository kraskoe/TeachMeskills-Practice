// import {Categories} from "./utils";

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

// function buildAuthPopup() {
// 	const formHTML = `
// 		<form id="auth__form">
// 			<label class="auth__email">
// 				<input type="email" name="email" id="email" class="auth__email-input" required>
// 			Email
// 			</label>
// 			<label class="auth__password">
// 				<input type="password" name="password" id="password" class="auth__password-input" required>
// 			Password
// 			</label>
// 			<div class="auth__actions">
// 				<button type="submit" class="auth__login">Login</button>
// <!--				<button type="submit" class="auth__register">Register</button>-->
// 			</div>
// 		</form>
// 	`
// 	document.getElementById('root').insertAdjacentHTML('afterbegin', formHTML);
//
// 	document.getElementById('auth__form').addEventListener('submit', authFormHandler, {once: true});
// }
//
// function authFormHandler(event) {
// 	event.preventDefault();
//
// 	// const btn = event.target.querySelector('auth__login');
// 	const authForm = document.getElementById('auth__form');
// 	const email = event.target.elements['email'].value;
// 	const password = event.target.elements['password'].value;
//
// 	// btn.disabled = true;
// 	authWithEmailAndPasword(email,password)
// 		.then(token => {
// 			return Categories.fetch(token);
// 		})
// 		.then(buildModalAfterAuth)
// 		// .then(() => authForm.style.display = 'none')
// 		// .then(() => btn.disabled = false)
// }
//
// function authWithEmailAndPasword(email, password) {
// 	const apiKey = 'AIzaSyB2dBmcGBOoXBvwLu_30JUaZah1zu-JzOU';
// 	return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
// 		method: 'POST',
// 		body: JSON.stringify({email, password, returnSecureToken: true}),
// 		headers: {'Content-Type': 'application/json'},
// 	})
// 		.then(response => response.json())
// 		.then(data => data.idToken)
// }
//
// function buildModalAfterAuth(content) {
// 	console.log(content)
// }

export {accessUserName, buildGreetingSection};
// export {accessUserName, buildGreetingSection, buildAuthPopup};

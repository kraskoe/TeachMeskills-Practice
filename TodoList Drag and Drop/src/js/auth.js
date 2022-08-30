import {auth, userID} from './app';
import {browserSessionPersistence, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword} from 'firebase/auth';
import {getCategories, getTasks, getUserData, writeUserData} from "./utils";
import {accessUserName} from "./greetingBuilder";
import {refreshCategories, displayTasks} from "./newTaskBuilder";


function buildAuthForm() {
	const formHTML = `
		<section class="auth__section">
			<form id="auth__form">
				<div class="_switcher">&#128472;</div>
				<label class="auth__email">
					<input type="email" name="email" id="email" class="auth__email-input" required>
				Email
				</label>
				<label class="auth__name">
					<input type="text" name="user-name" id="user-name" class="auth__name-input">
				Name
				</label>
				<label class="auth__password">
					<input type="password" name="password" id="password" class="auth__password-input" required>
				Password
				</label>
				<div class="_error">Wrong user / password</div>
				<div class="auth__actions">
					<button type="button" class="auth__login _active">Sign in</button>
					<button type="button" class="auth__register">Register</button>
				</div>
			</form>
		</section>
	`

	document.getElementById('root').insertAdjacentHTML('afterbegin', formHTML);

	const switcher = document.querySelector('._switcher');
	const name = document.querySelector('.auth__name');
	const nameInput = document.querySelector('.auth__name-input');
	const login = document.querySelector('.auth__login');
	const register = document.querySelector('.auth__register');

	switcher.addEventListener('click', e => {
		name.classList.toggle('_active');
		nameInput.classList.toggle('_active');
		login.classList.toggle('_active');
		register.classList.toggle('_active');
	});
	login.addEventListener('click', loginEmailPassword);
	register.addEventListener('click', e => {
		name.classList.toggle('_active');
		nameInput.classList.toggle('_active');
		login.classList.toggle('_active');
		register.classList.toggle('_active');
		createUserAccount(e);
	});
}

async function loginEmailPassword(event) {
	const authForm = event.target.closest('#auth__form');
	let loginEmail = authForm.querySelector('.auth__email-input');
	let loginPassword = authForm.querySelector('.auth__password-input');
	hideLoginError();

		setPersistence(auth, browserSessionPersistence)
			.then(async () => {
				return await signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value);
			})
			.then(() => {
				loginEmail.value = '';
				loginPassword.value = '';
			})
			.then(() => getUserData(userID, 'username'))
			.then(() => accessUserName())
			.then(() => getUserData(userID, 'categories'))
			.then(() => refreshCategories())
			.then(() => getUserData(userID, 'tasks'))
			.then(() => displayTasks())
			.catch((error) => {
				showLoginError(error);
			});

		// const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
		// console.log(userCredential.user);
}

function showLoginError(error) {
	const divLoginError = document.querySelector('._error');
	divLoginError.style.display = 'block';
}

function hideLoginError() {
	const divLoginError = document.querySelector('._error');
	divLoginError.style.display = '';
}

async function createUserAccount(event) {
	const authForm = event.target.closest('#auth__form');
	const email = authForm.querySelector('.auth__email-input');
	const password = authForm.querySelector('.auth__password-input');
	const name = authForm.querySelector('.auth__name-input');

	console.log(name);

	await createUserWithEmailAndPassword(auth, email.value, password.value)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			console.log(user.uid)
			writeUserData(user.uid, 'username', name.value);
			// console.log(user.uid);
		})
		.then(() => getUserData(userID, 'username'))
		.then(() => accessUserName())
		.then(() => {
			email.value = '';
			name.value = '';
			password.value = '';
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// ..
		});
}

async function userSignOut() {
	const categories = localStorage.getItem('categories');
	const tasks = localStorage.getItem('tasks') || [];
	writeUserData(userID, 'categories', categories)
		.then(() => writeUserData(userID, 'tasks', tasks))
		.then(() => signOut(auth)
			.then(() => {
			}).catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(error.code, error.message);
			}));
}

export {buildAuthForm, userSignOut};
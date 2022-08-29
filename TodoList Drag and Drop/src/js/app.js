import '../css/style.css';
import '../css/greeting.css';
import '../css/new-task.css';
import '../css/todo-list.css';
import '../css/sort-options.css';
import {accessUserName, buildGreetingSection} from './greetingBuilder';
// import {accessUserName, buildGreetingSection, buildAuthPopup} from './greetingBuilder';
import {buildNewTaskSection} from './newTaskBuilder';
import {buildTodoSection, displayTasks} from './tasksHandler';
// import {Categories} from './utils';
import {initializeApp} from 'firebase/app';
import {getAuth, onAuthStateChanged, connectAuthEmulator, signInWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, ref, set, onValue} from 'firebase/database';


// const firebaseConfig = {
// 	apiKey: "AIzaSyB2dBmcGBOoXBvwLu_30JUaZah1zu-JzOU",
// 	authDomain: "todo-list-8f870.firebaseapp.com",
// 	databaseURL: "https://todo-list-8f870-default-rtdb.firebaseio.com",
// 	projectId: "todo-list-8f870",
// 	storageBucket: "todo-list-8f870.appspot.com",
// 	messagingSenderId: "264018114866",
// 	appId: "1:264018114866:web:9613513dd4070e52fa7f2b"
// };
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(firebaseConfig);
//
// connectAuthEmulator(auth, 'http://localhost:9099');
// const loginEmailPassword = async () => {
// 	const loginEmail = txtEmail.value;
// 	const loginPassword = txtPassword.value;
//
// 	try {
// 		const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
// 		console.log(userCredential.user);
// 	}
// 	catch (error) {
// 		console.log(error);
// 	}
// }
//
// btnLogin.addEventListener('click', loginEmailPassword);
//
// function writeUserData(userId, name, email, password) {
// 	const db = getDatabase();
// 	const reference = ref(db, 'users/' + userId);
//
// 	set(reference, {
// 		username: name,
// 		email: email,
// 		password: password,
// 	})
// }

// const db = getDatabase();
// const categoriesRef = ref(db, 'users/' + userId + 'categories');
// onValue(categoriesRef, (snapshot) => {
// 	const data = snapshot.val();
// 	updateCategories(postElement, data);
// });

//Detect auth state
// onAuthStateChanged(auth, user => {
// 	if (user!= null) {
// 		console.log('Logged in');
// 	} else {
// 		console.log('Unauthorized user');
// 	}
// });

window.addEventListener('DOMContentLoaded', () => {
	// buildAuthPopup();

	embedSection(buildGreetingSection());
	accessUserName();

	embedSection(buildNewTaskSection());

	embedSection(buildTodoSection());
	displayTasks();
});

function embedSection(section) {
	const root = document.getElementById('root');
	root.append(section);
}






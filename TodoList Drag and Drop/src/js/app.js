import '../css/style.css';
import '../css/auth.css';
import '../css/greeting.css';
import '../css/new-task.css';
import '../css/todo-list.css';
import '../css/sort-options.css';
import {accessUserName, buildGreetingSection} from './greetingBuilder';
import {buildNewTaskSection, refreshCategories} from './newTaskBuilder';
import {buildTodoSection, displayTasks} from './tasksHandler';
import {buildAuthForm} from './auth';
import {initializeApp} from 'firebase/app';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {getUserData} from "./utils";

const firebaseConfig = {
	apiKey: "AIzaSyB2dBmcGBOoXBvwLu_30JUaZah1zu-JzOU",
	authDomain: "todo-list-8f870.firebaseapp.com",
	databaseURL: "https://todo-list-8f870-default-rtdb.firebaseio.com",
	projectId: "todo-list-8f870",
	storageBucket: "todo-list-8f870.appspot.com",
	messagingSenderId: "264018114866",
	appId: "1:264018114866:web:9613513dd4070e52fa7f2b"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let userID;

window.addEventListener('DOMContentLoaded', () => {
	buildAuthForm();
	embedSection(buildGreetingSection());
	embedSection(buildNewTaskSection());
	embedSection(buildTodoSection());

	//Detect auth state
	onAuthStateChanged(auth, user => {
		if (user!= null) {
			userID = user.uid;
			// getUserData(userID, 'username')
			// 	.then(() => accessUserName());
			// getUserData(userID, 'categories')
			// 	.then(() => refreshCategories());
			// getUserData(userID, 'tasks')
			// 	.then(() => displayTasks());
			document.querySelector('.auth__section').style.display = 'none';

			accessUserName();
			refreshCategories();
			displayTasks();
		} else {
			localStorage.clear();
			document.querySelector('.auth__section').style.display = 'block';
		}
	});

});

function embedSection(section) {
	const root = document.getElementById('root');
	root.append(section);
}

export {app, auth, userID};

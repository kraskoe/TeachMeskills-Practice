import {v4 as uuidv4} from "uuid";
import {getDatabase, child, ref, get, set, onValue} from 'firebase/database';


function initCategories() {
	const defaultCategories = [
		{value: 'General', id: uuidv4(), color: '#7a7acc', order: '01',},
		{value: 'Car', id: uuidv4(), color: '#56bf9c', order: '02',},
		{value: 'Cooking', id: uuidv4(), color: '#d96da1', order: '03',},
		{value: 'Home', id: uuidv4(), color: '#b17acc', order: '04',},
		{value: 'Ideas', id: uuidv4(), color: '#ffaa33', order: '05',},
		{value: 'Payments', id: uuidv4(), color: '#ca5463', order: '06',},
		{value: 'Purchases', id: uuidv4(), color: '#7acc52', order: '07',},
		{value: 'Travel', id: uuidv4(), color: '#348ce1', order: '09',},
		{value: 'Work', id: uuidv4(), color: '#a3b8cc', order: '08',},
	];

	setCategories(defaultCategories);
}

function getCategories() {
	if (!localStorage.getItem('categories')) initCategories();
	return  JSON.parse(localStorage
		.getItem('categories'))
		?.sort((obj1, obj2) => obj1.order - obj2.order);
}

function setCategories(categories) {
	localStorage.setItem('categories', JSON.stringify(categories));
}

function getTasks() {
	return JSON.parse(localStorage
		.getItem('tasks'))
		?.sort((obj1, obj2) => obj1.order - obj2.order) || []
}

function setTasks(tasks) {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

async function getUserData(userId, entry) {
	const db = getDatabase();
	const reference = ref(db,`users/${userId}/`);

	await get(child(reference, `${entry}`))
		.then((snapshot) => {
			if (snapshot.exists()) {
				localStorage.setItem(entry, snapshot.val());
				// return snapshot.val();
			} else {
				// return "No data available";
			}
		})
		// .then(response => response)
		.catch((error) => {
			console.error(error);
		});
}

async function writeUserData(userId, entry, value) {
	const db = getDatabase();
	const reference = ref(db, `users/${userId}/${entry}`);

	await set(reference, value);
}

export {getCategories, setCategories, getTasks, setTasks, getUserData, writeUserData};

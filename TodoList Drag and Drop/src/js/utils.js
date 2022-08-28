import {v4 as uuidv4} from "uuid";

// class Categories {
// 	static set(categories) {
// 		return fetch('https://todo-list-8f870-default-rtdb.firebaseio.com/categories.json', {
// 			method: 'POST',
// 			body: JSON.stringify(categories),
// 			headers: {
// 				'Content-Type': 'application/json'
// 			}
// 		})
// 			.then(response => response.json())
// 			.then(response => {
// 				categories.id = response.name;
// 				// return categories;
// 			})
// 	}
//
// 	static fetch(token) {
// 		if (!token) {
// 			return Promise.resolve(`<p>You are not authorized</p>`)
// 		}
// 		return fetch(`https://todo-list-8f870-default-rtdb.firebaseio.com/categories.json?auth=${token}`)
// 			.then(response => response.json())
// 			.then(response => {
// 				if (response.error) {
// 					return `<p>${response.error}</p>`
// 				}
// 				return response ? Object.keys(response).map(key => ({...response[key], id: key})) : [];
// 			})
// 	}
// }

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
	if (!localStorage.key('tasks')) initCategories();
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

export {getCategories, setCategories, getTasks, setTasks};
// export {getCategories, setCategories, getTasks, setTasks, Categories};

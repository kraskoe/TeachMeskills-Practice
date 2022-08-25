export {buildTodoSection, displayTasks, getTasks, setTasks};
import {getCategories} from './newTaskBuilder';

function buildTodoSection() {
	const todoSection = document.createElement('section');
	const todoHeader = document.createElement('h3');
	const todoList = document.createElement('div');

	todoHeader.innerHTML = 'Task list';
	todoList.classList.add('todo__list')

	todoSection.append(todoHeader);
	todoSection.classList.add('todo__section');
	todoSection.insertAdjacentHTML('beforeend', '<hr>');
	todoSection.append(todoList);

	return todoSection;
}

function displayTasks() {
	const todoList = document.querySelector('.todo__list');
	const tasks = getTasks().sort((obj1, obj2) => obj1.order - obj2.order);
	const activeTasks = tasks
		.filter(obj => !obj.done);
	const activeCrucialTasks = activeTasks
		.filter(obj => obj.importance === '2');
	const activeImportantTasks = activeTasks
		.filter(obj => obj.importance === '1');
	const activeGeneralTasks = activeTasks
		.filter(obj => obj.importance === '0');
	const doneTasks = tasks.filter(obj => obj.done);

	todoList.innerHTML = '';

	activeCrucialTasks.forEach(task => todoList.append(processTask(task)));
	activeImportantTasks.forEach(task => todoList.append(processTask(task)));
	activeGeneralTasks.forEach(task => todoList.append(processTask(task)));
	todoList.append(document.createElement('hr'));
	doneTasks.forEach(task => todoList.append(processTask(task)));
}

function getTasks() {
	return JSON.parse(localStorage
		.getItem('tasks'))
		?.sort((obj1, obj2) => obj1.order - obj2.order) || []
}

function setTasks(tasks) {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function processTask(task) {
	const todoItem = document.createElement('div');
	const todoItemPicker = document.createElement('div');
	const label = document.createElement('label');
	const input = document.createElement('input');
	const span = document.createElement('span');
	const title = document.createElement('input');
	const desc = document.createElement('textarea');
	const importance = document.createElement('div');
	const category = document.createElement('div');
	const expiry = document.createElement('input');
	const editButton = document.createElement('button');
	const saveButton = document.createElement('button');
	const cancelButton = document.createElement('button');
	const deleteButton = document.createElement('button');

	const taskCategory = getCategory(task.categoryID);

	todoItem.classList.add('todo__item');
	todoItem.dataset.dateCreated = task.dateCreated;
	todoItem.dataset.id = task.id;

	todoItemPicker.classList.add('todo__item-picker');

	label.classList.add('todo__label');

	input.type = 'checkbox';
	input.classList.add('todo__checkbox');
	input.checked = task.done;

	span.classList.add('todo__bubble');
	span.style.borderColor = taskCategory.color;
	span.style.color = taskCategory.color;

	title.classList.add('todo__title');
	title.type = 'text';
	title.value = task.title;
	title.setAttribute('readonly', 'readonly');

	if (task.desc) {
		desc.classList.add('todo__desc');
		desc.value = task.desc;
		desc.setAttribute('readonly', 'readonly');
	}

	importance.classList.add('todo__importance');
	importance.dataset.importance = task.importance;

	category.classList.add('todo__category');
	category.style.backgroundColor = taskCategory.color;
	category.innerHTML = taskCategory.value;

	if(task.expiryDate) {
		expiry.classList.add('todo__expiry');
		expiry.type = 'date';
		expiry.value = task.expiryDate;
		expiry.setAttribute('disabled', 'disabled');
	}

	if (task.done) {
		todoItem.classList.add('_done');
	}

	editButton.classList.add('todo__edit');
	editButton.setAttribute('type', 'button');
	editButton.innerHTML = 'Edit';

	saveButton.classList.add('todo__save');
	saveButton.setAttribute('type', 'button');
	saveButton.innerHTML = 'Save';
	saveButton.style.display = 'none';

	cancelButton.classList.add('todo__cancel');
	cancelButton.setAttribute('type', 'button');
	cancelButton.innerHTML = 'Cancel';
	cancelButton.style.display = 'none';

	deleteButton.classList.add('todo__delete');
	deleteButton.setAttribute('type', 'button');
	deleteButton.innerHTML = 'Delete';

	label.append(input, span);
	todoItemPicker.append(label, importance, title, category, editButton, saveButton, cancelButton, deleteButton);
	if(task.expiryDate) {
		category.after(expiry);
	}
	todoItem.append(todoItemPicker);
	if (task.desc) {
		todoItem.append(desc);
	}

	input.addEventListener('click', checkTask);
	// editButton.addEventListener('click', editTask, {once: true});
	deleteButton.addEventListener('click', deleteTask);

	return todoItem;
}

function checkTask(event) {
	const todoItem = event.target.closest('.todo__item');
	const tasks = getTasks();
	const task = tasks.find(obj => (obj.id === todoItem.dataset.id));

	task.done = event.target.checked;

	setTasks(tasks);

	todoItem.classList.toggle('_done');

	displayTasks();
}
//
// function editTask(event) {
// 	event.stopPropagation();
//
// 	const item = event.target.closest('.todo__item');
// 	const input = item.querySelector('.todo__title');
// 	const inputValue = input.value;
// 	const dateCreated = item.dataset.dateCreated;
// 	const edit = event.target;
//
// 	input.removeAttribute('readonly');
// 	input.focus();
//
// 	edit.innerHTML = 'Save';
// 	edit.style.backgroundColor = '#ff5b57';
//
// 	// input.addEventListener('blur', e => saveEditedTask(e, inputValue, dateCreated));
// 	// input.addEventListener('keyup', e => {
// 	// 	if (e.code === 'Enter') saveEditedTask(e, inputValue, dateCreated);
// 	// }, {once: true})
// 	edit.addEventListener('click', e => saveEditedTask(e, inputValue, dateCreated), {once: true});
// }
//
// function saveEditedTask(event, inputValue, dateCreated) {
// 	event.stopPropagation();
//
// 	const tasks = getTasks();
// 	const task = tasks.find(t => t.title === inputValue && t.dateCreated.toString() === dateCreated);
//
// 	const item = event.target.closest('.todo__item');
// 	const input = item.querySelector('.todo__title');
// 	const edit = event.target;
//
// 	input.setAttribute('readonly', 'readonly');
// 	task.title = input.value;
//
// 	setTasks(tasks);
//
// 	edit.innerHTML = 'Edit';
// 	edit.style.backgroundColor = '';
//
// 	event.target.addEventListener('click', editTask, {once: true});
// 	// displayTasks();
// }

function deleteTask(event) {
	event.stopPropagation();

	let tasks = getTasks();
	const taskID = event.target.closest('.todo__item').dataset.id;
	tasks = tasks.filter(t => t.id !== taskID);
	setTasks(tasks);
	displayTasks();
}

function getCategory(catID) {
	const categories = getCategories();

	return categories.find(obj => obj.id === catID);
}


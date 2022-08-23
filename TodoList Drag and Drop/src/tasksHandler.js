export {buildTodoSection, displayTasks, getTasks, setTasks};

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
	const tasks = getTasks();

	todoList.innerHTML = '';

	tasks.forEach(task => todoList.append(processTask(task)));

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
	const label = document.createElement('label');
	const input = document.createElement('input');
	const span = document.createElement('span');
	const title = document.createElement('input');
	const actions = document.createElement('div');
	const editButton = document.createElement('button');
	const deleteButton = document.createElement('button');

	todoItem.classList.add('todo__item');
	todoItem.dataset.dateCreated = task.dateCreated;
	if (task.expiryDate) todoItem.dataset.expiryDate = task.expiryDate;

	label.classList.add('todo__label');

	input.type = 'checkbox';
	input.classList.add('todo__checkbox');
	input.checked = task.done;

	span.classList.add('todo__bubble');
	span.style.borderColor = task.color;
	span.style.color = task.color;

	title.classList.add('todo__title');
	title.type = 'text';
	title.value = task.title;
	title.setAttribute('readonly', 'readonly');

	actions.classList.add('todo__actions');

	editButton.classList.add('todo__edit');
	editButton.innerHTML = 'Edit';

	deleteButton.classList.add('todo__delete');
	deleteButton.innerHTML = 'Delete';

	label.append(input, span);
	actions.append(editButton, deleteButton);
	todoItem.append(label, title, actions);

	if (task.done) {
		todoItem.classList.add('_done');
	}

	input.addEventListener('click', checkTask);
	editButton.addEventListener('click', editTask, {once: true});
	deleteButton.addEventListener('click', deleteTask);

	return todoItem;
}

function checkTask(event) {
	const todoItem = event.target.closest('.todo__item');
	const tasks = getTasks();
	const task = tasks.find(obj => (obj.title === todoItem
		.querySelector('.todo__title').value) && (obj.dateCreated.toString() === todoItem
		.dataset.dateCreated));

	task.done = event.target.checked;

	setTasks(tasks);

	todoItem.classList.toggle('_done');
}

function editTask(event) {
	event.stopPropagation();

	const item = event.target.closest('.todo__item');
	const input = item.querySelector('.todo__title');
	const inputValue = input.value;
	const dateCreated = item.dataset.dateCreated;
	const edit = event.target;

	input.removeAttribute('readonly');
	input.focus();

	edit.innerHTML = 'Save';
	edit.style.backgroundColor = '#ff5b57';

	// input.addEventListener('blur', e => saveEditedTask(e, inputValue, dateCreated));
	// input.addEventListener('keyup', e => {
	// 	if (e.code === 'Enter') saveEditedTask(e, inputValue, dateCreated);
	// }, {once: true})
	edit.addEventListener('click', e => saveEditedTask(e, inputValue, dateCreated), {once: true});
}

function saveEditedTask(event, inputValue, dateCreated) {
	event.stopPropagation();

	const tasks = getTasks();
	const task = tasks.find(t => t.title === inputValue && t.dateCreated.toString() === dateCreated);

	const item = event.target.closest('.todo__item');
	const input = item.querySelector('.todo__title');
	const edit = event.target;

	input.setAttribute('readonly', 'readonly');
	task.title = input.value;

	setTasks(tasks);

	edit.innerHTML = 'Edit';
	edit.style.backgroundColor = '';

	event.target.addEventListener('click', editTask, {once: true});
	// displayTasks();
}

function deleteTask(event) {
	event.stopPropagation();

	let tasks = getTasks();
	const taskName = event.target.closest('.todo__item').querySelector('.todo__title').value;
	tasks = tasks.filter(t => t.title !== taskName);
	setTasks(tasks);
	displayTasks();
}


import {getCategories, getTasks, setCategories, setTasks} from './utils';
import {buildSortOptions}  from './buildTodoSortOptions';

function buildTodoSection() {
	const todoSection = document.createElement('section');
	const todoHeader = document.createElement('h3');
	const todoList = document.createElement('div');

	todoHeader.innerHTML = 'Task list';
	todoList.classList.add('todo__list')

	todoSection.append(todoHeader);
	todoSection.classList.add('todo__section');
	todoSection.insertAdjacentHTML('beforeend', '<hr>');
	todoSection.append(buildSortOptions());
	todoSection.append(todoList);

	return todoSection;
}

function displayTasks() {
	const categories = getCategories();
	const todoList = document.querySelector('.todo__list');
	const todoListContainer = document.createElement('div');
	const filterClosed = document.getElementById('todo__closed-checkbox');
	const sortOptionArr = document.querySelectorAll('.todo__sort-radio');
	const sortOption = Array.from(sortOptionArr).find(obj => obj.checked);
	let tasks = getTasks();

	if (sortOption) {
		switch (sortOption.id) {
			case 'todo__sort-radio_0':
				tasks.sort((obj1, obj2) => obj1.order - obj2.order);
				break;
			case 'todo__sort-radio_1':
				tasks.sort((obj1, obj2) => obj2.importance - obj1.importance);
				break;
			case 'todo__sort-radio_2':
				tasks.sort((obj1, obj2) => (
					categories.find(item => item.id === obj1.categoryID).order -
					categories.find(item => item.id === obj2.categoryID).order
				));
				break;
			case 'todo__sort-radio_3':
				const expiryTasks = tasks.filter(obj => obj.expiryDate);
				const defaultTasks = tasks.filter(obj => !obj.expiryDate);
				expiryTasks.sort((obj1, obj2) => {
					if (obj1.expiryDate > obj2.expiryDate) {
						return 1;
					} else return -1;
				})
				tasks = expiryTasks.concat(defaultTasks);
				break;
		}
	}

	const activeTasks = tasks.filter(obj => !obj.done);
	const doneTasks = tasks.filter(obj => obj.done);

	todoListContainer.classList.add('todo__list-container')

	todoList.innerHTML = '';
	todoList.append(todoListContainer);

	activeTasks.forEach(task => todoListContainer.append(processTask(task)));
	todoListContainer.append(document.createElement('hr'));
	if (filterClosed.checked) {
		doneTasks.forEach(task => todoListContainer.append(processTask(task)));
	}

	todoListAddEventListeners();
}

function processTask(task) {
	const todoItem = document.createElement('div');
	const todoItemPicker = document.createElement('div');
	const label = document.createElement('label');
	const input = document.createElement('input');
	const span = document.createElement('span');
	const title = document.createElement('input');
	const desc = document.createElement('textarea');
	const importance = buildTaskEditImportance(task);
	const category = buildTaskEditCategory(task);
	const expiry = document.createElement('input');
	const editButton = document.createElement('button');
	const saveButton = document.createElement('button');
	const cancelButton = document.createElement('button');
	const deleteButton = document.createElement('button');
	const isOrderSortChecked = document.getElementById('todo__sort-radio_0').checked;

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

	desc.classList.add('todo__desc');
	desc.value = task.desc;
	desc.setAttribute('readonly', 'readonly');

	if (!task.desc) {
		desc.style.display = 'none';
	}

	expiry.classList.add('todo__expiry');
	Object.assign(expiry, {
		type: 'date',
		min: (new Date()).toISOString().slice(0,10),
	})
	expiry.value = task.expiryDate;
	expiry.setAttribute('disabled', 'disabled');

	if (Date.parse(task.expiryDate) < (new Date()).getTime()) {
		if ((new Date(task.expiryDate)).getDate() === (new Date()).getDate()) {
			expiry.style.color = 'orange';
		} else expiry.style.color = 'red';
	} else expiry.style.color = '';

	if (!task.expiryDate) {
		expiry.style.display = 'none';
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
	todoItemPicker.append(label, importance, title, category, expiry, editButton, saveButton, cancelButton, deleteButton);
	todoItem.append(todoItemPicker, desc);

	if (isOrderSortChecked) todoItem.draggable = true;

	return todoItem;
}

function getTaskItems(event) {
	const item = event.target.closest('.todo__item');
	const input = item.querySelector('.todo__checkbox');
	const title = item.querySelector('.todo__title');
	const desc = item.querySelector('.todo__desc');
	const importance = item.querySelector('.todo__importance');
	const category = item.querySelector('.todo__category');
	const expiry = item.querySelector('.todo__expiry');

	const editButton = item.querySelector('.todo__edit');
	const saveButton = item.querySelector('.todo__save');
	const cancelButton = item.querySelector('.todo__cancel');
	const deleteButton = item.querySelector('.todo__delete');

	return {item,
		input,
		title,
		desc,
		importance,
		category,
		expiry,
		editButton,
		saveButton,
		cancelButton,
		deleteButton,
	}
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

function editTask(event) {
	const items = getTaskItems(event);

	unlockTask(items);

	items.title.focus();
}

function saveTask(event) {
	const items = getTaskItems(event);

	const tasks = getTasks();
	const task = tasks.find(obj => obj.id === items.item.dataset.id);

	task.title = items.title.value;
	task.importance = items.importance.dataset.importance;
	task.categoryID = items.category.dataset.id;
	if (items.desc.value) task.desc = items.desc.value;
	if (items.expiry.value)  task.expiryDate = items.expiry.value;

	lockTask(items);

	closeCategories(event);
	closeImps(event);

	setTasks(tasks);

	displayTasks();
}

function cancelTask(event) {
	const items = getTaskItems(event);

	const tasks = getTasks();
	const task = tasks.find(obj => obj.id === items.item.dataset.id);
	const taskCategory = getCategory(task.categoryID);

	items.title.value = task.title;
	items.importance.dataset.importance = task.importance;
	items.category.style.backgroundColor = taskCategory.color;
	items.category.innerHTML = taskCategory.value;
	if (items.desc) items.desc.value = task.desc;
	if (items.expiry) items.expiry.value = task.expiryDate;

	checkExpiryDate(event);
	closeCategories(event);
	closeImps(event);

	lockTask(items);
}

function deleteTask(event) {
	let tasks = getTasks();
	const taskID = event.target.closest('.todo__item').dataset.id;
	tasks = tasks.filter(t => t.id !== taskID);
	setTasks(tasks);
	displayTasks();
}

function lockTask(items) {
	items.input.removeAttribute('disabled');

	items.title.setAttribute('readonly', 'readonly');

	items.importance.setAttribute('disabled', 'disabled');
	items.importance.style.cursor = '';

	items.category.setAttribute('disabled', 'disabled');
	items.category.style.cursor = '';

	items.desc.setAttribute('readonly', 'readonly');
	if (!items.desc.value) items.desc.style.display = 'none';

	items.expiry.setAttribute('disabled', 'disabled');
	if (!items.expiry.value) items.expiry.style.display = 'none';

	items.editButton.style.display = '';
	items.saveButton.style.display = 'none';
	items.cancelButton.style.display = 'none';
	items.deleteButton.style.display = '';

}

function unlockTask(items) {
	items.input.setAttribute('disabled', 'disabled');

	items.title.removeAttribute('readonly');

	items.importance.removeAttribute('disabled');
	items.importance.style.cursor = 'pointer';

	items.category.removeAttribute('disabled');
	items.category.style.cursor = 'pointer';

	items.desc.removeAttribute('readonly');
	if (!items.desc.value) items.desc.style.display = '';

	items.expiry.removeAttribute('disabled');
	if (!items.expiry.value) items.expiry.style.display = '';

	items.editButton.style.display = 'none';
	items.saveButton.style.display = '';
	items.cancelButton.style.display = '';
	items.deleteButton.style.display = 'none';
}

function getCategory(catID) {
	const categories = getCategories();

	return categories.find(obj => obj.id === catID);
}

function buildTaskEditCategory(task){
	const categoryButton = document.createElement('button');
	const categoriesWrapper = document.createElement('div');
	const categoriesList = document.createElement('ul');

	const categories = getCategories();
	const taskCategory = getCategory(task.categoryID);

	categoryButton.classList.add('todo__category');
	categoryButton.type = 'button';
	categoryButton.dataset.id = task.categoryID;
	categoryButton.style.backgroundColor = taskCategory.color;
	categoryButton.innerHTML = taskCategory.value;
	categoryButton.setAttribute('disabled', 'disabled');

	categoriesWrapper.classList.add('todo__category-wrapper');
	categoriesList.classList.add('todo__category-container');
	categoriesList.innerHTML = '';

	for (let i = 0; i < categories.length; i++) {
		// if (categoryButton.dataset.id === categories[i].id) continue;
		let item = document.createElement('li');

		item.classList.add('todo__category-item');
		item.dataset.id = categories[i].id;
		item.style.backgroundColor = getCategory(item.dataset.id).color;
		item.innerHTML = getCategory(item.dataset.id).value;

		categoriesList.append(item);
	}

	categoriesWrapper.append(categoryButton, categoriesList);

	return categoriesWrapper;
}

function closeCategories(event) {
	const item = event.target.closest('.todo__item');
	const categoryContainer = item.querySelector('.todo__category-container');
	categoryContainer.classList.remove('_active');
}

function toggleCategories(event) {
	const item = event.target.closest('.todo__item');
	const categoryContainer = item.querySelector('.todo__category-container');
	categoryContainer.classList.toggle('_active');
}

function setCategory(event) {
	const item = event.target;
	const categoryWrapper = event.target.closest('.todo__category-wrapper');
	const categoryButton = categoryWrapper.querySelector('.todo__category')
	const categoryContainer = categoryWrapper.querySelector('.todo__category-container');
	const category = getCategories().find(obj => obj.id === item.dataset.id);

	categoryButton.dataset.id = item.dataset.id;
	categoryButton.innerHTML = category.value;
	categoryButton.style.backgroundColor = category.color;

	categoryContainer.classList.remove('_active');
}

function buildTaskEditImportance(task){
	const impButton = document.createElement('button');
	const impWrapper = document.createElement('div');
	const impList = document.createElement('ul');

	impButton.classList.add('todo__importance');
	impButton.type = 'button';
	impButton.dataset.importance = task.importance;
	impButton.setAttribute('disabled', 'disabled');

	impWrapper.classList.add('todo__imp-wrapper');
	impList.classList.add('todo__imp-container');
	impList.innerHTML = '';

	for (let i = 0; i < 3; i++) {
		let item = document.createElement('li');

		item.classList.add('todo__imp-item');
		item.dataset.importance = '' + i;

		impList.append(item);
	}

	impWrapper.append(impButton, impList);

	return impWrapper;
}

function closeImps(event) {
	const item = event.target.closest('.todo__item');
	const impContainer = item.querySelector('.todo__imp-container');
	impContainer.classList.remove('_active');
}

function toggleImps(event) {
	const item = event.target.closest('.todo__item');
	const impContainer = item.querySelector('.todo__imp-container');
	impContainer.classList.toggle('_active');
}

function setImp(event) {
	const item = event.target;
	const impWrapper = event.target.closest('.todo__imp-wrapper');
	const impButton = impWrapper.querySelector('.todo__importance')
	const impContainer = impWrapper.querySelector('.todo__imp-container');

	impButton.dataset.importance = item.dataset.importance;

	impContainer.classList.remove('_active');
}

function checkExpiryDate(event) {
	const expiry = event.target
		.closest('.todo__item')
		.querySelector('.todo__expiry');
	if (Date.parse(expiry.value) < (new Date()).getTime()) {
		if ((new Date(expiry.value)).getDate() === (new Date()).getDate()) {
			expiry.style.color = 'orange';
		} else expiry.style.color = 'red';
	} else expiry.style.color = '';
}

function todoListAddEventListeners() {
	const todoListContainer = document.querySelector('.todo__list-container');

	todoListContainer.addEventListener('keyup', e => {
		if (e.target.classList.contains('todo__title') && (e.code === 'Enter' || e.code === 'Escape')) {
			e.target.blur();
		} else if (e.target.classList.contains('todo__desc') && e.code === 'Escape') {
			e.target.blur();
		}
	})

	todoListContainer.addEventListener('change', e => {
		if (e.target.classList.contains('todo__expiry')) {
			checkExpiryDate(e);
		}
	})

	todoListContainer.addEventListener('click', e => {
		if (e.target.classList.contains('todo__checkbox')) {
			checkTask(e);
		} else if (e.target.classList.contains('todo__category')) {
			toggleCategories(e);
		} else if (e.target.classList.contains('todo__category-item')) {
			setCategory(e);
		} else if (e.target.classList.contains('todo__importance')) {
			toggleImps(e);
		} else if (e.target.classList.contains('todo__imp-item')) {
			setImp(e);
		} else if (e.target.classList.contains('todo__edit')) {
			editTask(e);
		} else if (e.target.classList.contains('todo__save')) {
			saveTask(e);
		} else if (e.target.classList.contains('todo__cancel')) {
			cancelTask(e);
		} else if (e.target.classList.contains('todo__delete')) {
			deleteTask(e);
		}
	})

	todoListContainer.addEventListener(`dragstart`, (e) => {
		e.target.classList.add(`_selected`);
	})

	todoListContainer.addEventListener(`dragend`, (e) => {
		e.target.classList.remove(`_selected`);
		sortLocalStorageTasks();
	});

	todoListContainer.addEventListener(`dragover`, (e) => dragTaskItem(e));

}

function dragTaskItem(event) {
	event.preventDefault();

	const activeElement = event.currentTarget.querySelector('._selected');
	const currentElement = event.target.closest('.todo__item');
	const isMoveable = activeElement !== currentElement &&
		currentElement?.classList.contains('todo__item');

	if (!isMoveable) {
		return;
	}

	const nextElement = (currentElement === activeElement.nextElementSibling) ?
		currentElement.nextElementSibling :
		currentElement;

	event.currentTarget.insertBefore(activeElement, nextElement);
}

function sortLocalStorageTasks() {
	let order = 0;
	const tasksDoc = document
		.querySelector('.todo__list-container')
		.querySelectorAll('.todo__item');
	const tasksLS = getTasks();
	Array.from(tasksDoc)
		.forEach(el => {
			tasksLS
				.find(obj => obj.id === el.dataset.id)
				.order = ++order;
		})

	setTasks(tasksLS);
}

export {buildTodoSection, displayTasks, getTasks, setTasks};

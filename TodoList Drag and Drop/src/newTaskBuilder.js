export {buildNewTaskSection};
import {displayTasks, getTasks, setTasks} from './tasksHandler';
import { v4 as uuidv4 } from 'uuid';

function buildNewTaskSection() {
	const newTaskSection = document.createElement('section');
	const newTaskFormHeader = document.createElement('h3');
	const newTaskForm = document.createElement('form');
	const newTaskSubmitButton = document.createElement('input');
	const newTaskFormContainer = document.createElement('div');

	newTaskSubmitButton.type = 'submit';
	newTaskSubmitButton.value = 'Add task';
	newTaskSubmitButton.classList.add('new-task__add-task');

	newTaskFormHeader.innerHTML = 'Create a task';

	newTaskFormContainer.classList.add('new-task__form-container');

	newTaskForm.id = 'new-task__form';
	newTaskForm.classList.add('new-task__form');
	newTaskForm.setAttribute('novalidate', 'novalidate');
	newTaskFormContainer.append(buildNewTaskColumn());
	newTaskFormContainer.append(buildNewTaskOptionsColumn());
	newTaskForm.append(newTaskFormContainer);
	newTaskForm.append(newTaskSubmitButton);

	newTaskSection.classList.add('new-task__section');
	newTaskSection.append(newTaskFormHeader);
	newTaskSection.insertAdjacentHTML('beforeend', '<hr>');
	newTaskSection.append(newTaskForm);

	newTaskForm.addEventListener('submit', addNewTask);

	return newTaskSection;
}

function buildNewTaskColumn() {
	const newTaskColumn = document.createElement('div');

	const newTaskTitle = document.createElement('h4');
	const newTaskInput = document.createElement('input');
	const newTaskDesc = document.createElement('h4');
	const newTaskDescInput = document.createElement('textarea');
	const inputSymbolsCounter = document.createElement('div');

	newTaskTitle.innerHTML = 'What do you plan?';
	newTaskDesc.innerHTML = 'Describe your task';

	Object.assign(newTaskInput, {
		type: 'text',
		name: 'new-task-title',
		placeholder: 'Type your task here',
		required: 'required',
	})
	newTaskInput.setAttribute('maxlength', '100');
	Object.assign(newTaskDescInput, {
		name: 'new-task-desc',
		placeholder: 'Type task description here',
	})
	newTaskDescInput.setAttribute('maxlength', '1000');


	inputSymbolsCounter.classList.add('_symbols-counter');
	newTaskInput.classList.add('new-task__title');
	newTaskDescInput.classList.add('new-task__desc');
	newTaskColumn.classList.add('new-task__column');

	const inputSymbolsCounter2 = inputSymbolsCounter.cloneNode();
	inputSymbolsCounter.style.marginBottom = '1rem';

	newTaskColumn.append(newTaskTitle);
	newTaskColumn.append(newTaskInput);
	newTaskColumn.append(inputSymbolsCounter);
	newTaskColumn.append(newTaskDesc);
	newTaskColumn.append(newTaskDescInput);
	newTaskColumn.append(inputSymbolsCounter2);

	inputSymbolsCounter.innerHTML = inputSymbolsCounter.previousElementSibling.getAttribute('maxlength') + " symbol(s) left";
	inputSymbolsCounter2.innerHTML = inputSymbolsCounter2.previousElementSibling.getAttribute('maxlength') + " symbol(s) left";

	newTaskInput.addEventListener('input', e => countSymbolsLeft(e));
	newTaskDescInput.addEventListener('input', e => countSymbolsLeft(e));

	return newTaskColumn;
}

function buildNewTaskOptionsColumn() {
	const newTaskOptionColumn = document.createElement('div');
	const newTaskImportanceTitle= document.createElement('h4');
	const newTaskCategoryTitle= document.createElement('h4');
	const newTaskDateTitle= document.createElement('h4');

	newTaskImportanceTitle.innerHTML = 'Pick task significance';
	newTaskCategoryTitle.innerHTML = 'Pick category';
	newTaskDateTitle.innerHTML = 'Pick expiry date';
	newTaskDateTitle.style.marginTop = '1.5rem';

	newTaskOptionColumn.classList.add('new-task__option-column');
	newTaskOptionColumn.append(newTaskImportanceTitle);
	newTaskOptionColumn.append(buildNewTaskImportanceOptions());
	newTaskOptionColumn.append(newTaskCategoryTitle);
	newTaskOptionColumn.append(buildNewTaskCategoryOption());
	newTaskOptionColumn.append(newTaskDateTitle);
	newTaskOptionColumn.append(buildNewTaskDateOption());

	return newTaskOptionColumn;
}

function buildNewTaskImportanceOptions() {
	const newTaskImportanceOptions = document.createElement('div');
	const newTaskImportanceItem1 = document.createElement('div');
	const newTaskImportanceRadioInput1 = document.createElement('input');
	const newTaskImportanceRadioLabel1 = document.createElement('label');
	const newTaskImportanceItem2 = document.createElement('div');
	const newTaskImportanceRadioInput2 = document.createElement('input');
	const newTaskImportanceRadioLabel2 = document.createElement('label');
	const newTaskImportanceItem3 = document.createElement('div');
	const newTaskImportanceRadioInput3 = document.createElement('input');
	const newTaskImportanceRadioLabel3 = document.createElement('label');

	Object.assign(newTaskImportanceRadioInput1, {
		type: 'radio',
		name: 'new-task-importance',
		id: 'new-task-importance_1',
		value: 0,
		checked: 'checked',
	})
	Object.assign(newTaskImportanceRadioInput2, {
		type: 'radio',
		name: 'new-task-importance',
		id: 'new-task-importance_2',
		value: 1,
	})
	Object.assign(newTaskImportanceRadioInput3, {
		type: 'radio',
		name: 'new-task-importance',
		id: 'new-task-importance_3',
		value: 2,
	})

	newTaskImportanceRadioLabel1.setAttribute('for', 'new-task-importance_1');
	newTaskImportanceRadioLabel2.setAttribute('for', 'new-task-importance_2');
	newTaskImportanceRadioLabel3.setAttribute('for', 'new-task-importance_3');
	newTaskImportanceRadioLabel1.classList.add('new-task__importance-label');
	newTaskImportanceRadioLabel2.classList.add('new-task__importance-label');
	newTaskImportanceRadioLabel3.classList.add('new-task__importance-label');
	newTaskImportanceRadioLabel1.innerHTML = 'Default';
	newTaskImportanceRadioLabel2.innerHTML = 'Important';
	newTaskImportanceRadioLabel3.innerHTML = 'Crucial';

	newTaskImportanceItem1.classList.add('new-task__importance-item');
	newTaskImportanceItem2.classList.add('new-task__importance-item');
	newTaskImportanceItem3.classList.add('new-task__importance-item');
	newTaskImportanceItem1.append(newTaskImportanceRadioInput1);
	newTaskImportanceItem1.append(newTaskImportanceRadioLabel1);
	newTaskImportanceItem2.append(newTaskImportanceRadioInput2);
	newTaskImportanceItem2.append(newTaskImportanceRadioLabel2);
	newTaskImportanceItem3.append(newTaskImportanceRadioInput3);
	newTaskImportanceItem3.append(newTaskImportanceRadioLabel3);

	newTaskImportanceOptions.classList.add('new-task__importance');
	newTaskImportanceOptions.append(newTaskImportanceItem1);
	newTaskImportanceOptions.append(newTaskImportanceItem2);
	newTaskImportanceOptions.append(newTaskImportanceItem3);

	return newTaskImportanceOptions;
}

function buildNewTaskCategoryOption(){
	const newTaskCategories = document.createElement('div');
	const newTaskCategory = document.createElement('div');
	const newTaskCategoryContainer = document.createElement('div');

	newTaskCategories.classList.add('new-task__category-wrapper');
	newTaskCategory.classList.add('new-task__category-picker');

	newTaskCategoryContainer.classList.add('new-task__category-container');

	newTaskCategoryContainer.append(returnCategories());
	newTaskCategoryContainer.append(returnNewCategory());
	newTaskCategories.append(newTaskCategory);
	newTaskCategories.append(newTaskCategoryContainer);

	newTaskCategory.addEventListener('click', toggleCategoriesBar);

	newTaskCategory.innerHTML = newTaskCategoryContainer
		.firstElementChild
		.firstElementChild
		.firstElementChild.value || 'General';
	newTaskCategory.style.backgroundColor = newTaskCategoryContainer
		.firstElementChild
		.firstElementChild
		.children[1].value || '#7a7acc';

	return newTaskCategories;
}

function buildNewTaskDateOption() {
	const newTaskDateOption = document.createElement('input');

	Object.assign(newTaskDateOption, {
		type: 'date',
		name: 'new-task-date',
		min: (new Date()).toISOString().slice(0,10),
	})
	newTaskDateOption.classList.add('new-task__date');

	return newTaskDateOption;
}

function returnCategories() {
	let categories = getCategories();
	const categoriesList = document.createElement('ul');

	categoriesList.classList.add('new-task__category-list')
	categoriesList.innerHTML = '';

	categories.forEach(category => categoriesList.append(processCategory(category)));

	categoriesList.addEventListener(`dragstart`, (e) => {
		e.target.classList.add(`_selected`);
	})

	categoriesList.addEventListener(`dragend`, (e) => {
		e.target.classList.remove(`_selected`);
		sortLocalStorageCategories();
	});

	categoriesList.addEventListener(`dragover`, (e) => dragCategoryItem(e));

	return categoriesList;
}

function returnNewCategory() {
	const newCategoryItem = document.createElement('div');
	const newCategoryAddButton = document.createElement('button');
	const newCategoryInput = document.createElement('input');
	const newCategoryColor = document.createElement('input');
	const newCategorySaveButton = document.createElement('button');
	const newCategoryCancelButton = document.createElement('button');
	const categories = getCategories();

	newCategoryItem.classList.add('new-task__add-category');
	newCategoryInput.classList.add('new-task__category-value', 'new-task__category-value_narrow');
	newCategoryColor.classList.add('new-task__category-color');

	Object.assign(newCategoryInput, {
		type: 'text',
		// name: 'category-value',
		placeholder: 'Type category name',
	})
	newCategoryInput.style.display = 'none';

	Object.assign(newCategoryColor, {
		type: 'color',
		// name: 'category-color',
		value: '#7a7acc',
	})
	newCategoryColor.style.display = 'none';

	newCategoryAddButton.classList.add('new-task__category-add');
	newCategoryAddButton.setAttribute('type', 'button');
	newCategoryAddButton.innerHTML = 'Add new category';
	newCategorySaveButton.classList.add('new-task__category-edit');
	newCategorySaveButton.setAttribute('type', 'button');
	newCategorySaveButton.innerHTML = 'Save';
	newCategorySaveButton.style.display = 'none';
	newCategoryCancelButton.classList.add('new-task__category-delete');
	newCategoryCancelButton.setAttribute('type', 'button');
	newCategoryCancelButton.innerHTML = 'Cancel';
	newCategoryCancelButton.style.display = 'none';

	newCategoryItem.append(newCategoryInput,
		newCategoryColor,
		newCategoryAddButton,
		newCategorySaveButton,
		newCategoryCancelButton);

	newCategoryAddButton.addEventListener('click', e => {
		newCategoryInput.style.display = '';
		newCategoryColor.style.display = '';
		newCategoryAddButton.style.display = 'none';
		newCategorySaveButton.style.display = '';
		newCategoryCancelButton.style.display = '';
	})
	newCategoryInput.addEventListener('keyup', e => {
		if (e.code === 'Escape') cancelNewCategory(e);
	})
	newCategoryInput.addEventListener('input', e => {
			if (categories.find(obj => obj.value === newCategoryInput.value)) {
				newCategorySaveButton.setAttribute('disabled', 'disabled');
				newCategoryInput.style.color = 'red';
			} else {
				newCategorySaveButton.removeAttribute('disabled');
				newCategoryInput.style.color = '';
			}
	})
	newCategoryInput.addEventListener('keyup', e => {
		if (e.code === 'Enter') {
			if (categories.find(obj => obj.value === newCategoryInput.value)) {
				newCategorySaveButton.setAttribute('disabled', 'disabled');
				newCategoryInput.style.color = 'red';
			} else {
				newCategorySaveButton.removeAttribute('disabled');
				newCategoryInput.style.color = '';
				saveNewCategory(e);
			}
		}
	})
	newCategorySaveButton.addEventListener('click', e => {
		if (newCategoryInput.value) {
			saveNewCategory(e)
		} else {
			newCategoryInput.style.color = 'red';
		newCategoryInput.focus();
		}
	});
	newCategoryCancelButton.addEventListener('click', cancelNewCategory);

	return newCategoryItem;
}

function getCategories() {
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
	return  JSON.parse(localStorage
		.getItem('categories'))
		?.sort((obj1, obj2) => obj1.order - obj2.order) || defaultCategories;
}

function setCategories(categories) {
	localStorage.setItem('categories', JSON.stringify(categories));
}

function refreshCategories() {
	const categoryContainer = document.querySelector('.new-task__category-container');
	categoryContainer.innerHTML = '';
	categoryContainer.append(returnCategories());
	categoryContainer.append(returnNewCategory());
}

function processCategory(category) {
	const categoryItem = document.createElement('li');
	categoryItem.classList.add('new-task__category-item');
	categoryItem.dataset.id = category.id;
	categoryItem.draggable = true;

	const categoryInput = document.createElement('input');
	const categoryColor = document.createElement('input');
	const categoryEditButton = document.createElement('button');
	const categorySaveButton = document.createElement('button');
	const categoryCancelButton = document.createElement('button');
	const categoryDeleteButton = document.createElement('button');

	categoryInput.classList.add('new-task__category-value');
	Object.assign(categoryInput, {
		type: 'text',
		value: category.value,
	})
	categoryInput.setAttribute('readonly', 'readonly');

	Object.assign(categoryColor, {
		type: 'color',
		value: category.color,
		disabled: 'disabled',
	})
	categoryColor.classList.add('new-task__category-color');

	categoryEditButton.classList.add('new-task__category-edit');
	categoryEditButton.setAttribute('type', 'button');
	categoryEditButton.innerHTML = 'Edit';
	categorySaveButton.classList.add('new-task__category-save');
	categorySaveButton.setAttribute('type', 'button');
	categorySaveButton.innerHTML = 'Save';
	categoryCancelButton.classList.add('new-task__category-cancel');
	categoryCancelButton.setAttribute('type', 'button');
	categoryCancelButton.innerHTML = 'Cancel';
	categoryDeleteButton.classList.add('new-task__category-delete');
	categoryDeleteButton.setAttribute('type', 'button');
	categoryDeleteButton.innerHTML = 'Delete';

	categoryEditButton.style.display = '';
	categorySaveButton.style.display = 'none';
	categoryCancelButton.style.display = 'none';
	categoryDeleteButton.style.display = '';


	categoryItem.append(categoryInput,
		categoryColor,
		categoryEditButton,
		categorySaveButton,
		categoryCancelButton,
		categoryDeleteButton);

	categoryItem.addEventListener('click', setCategory);
	categoryEditButton.addEventListener('click', editCategory);
	categorySaveButton.addEventListener('click', saveEditedCategory);
	categoryCancelButton.addEventListener('click', cancelEditCategory);
	categoryDeleteButton.addEventListener('click', deleteCategory);

	return categoryItem;
}

function toggleCategoriesBar() {
	document.querySelector('.new-task__category-container').classList.toggle('_active');
}

function setCategory(event) {
	if (event.defaultPrevented) return;

	const categoryItem = document.querySelector('.new-task__category-picker');

	categoryItem.innerHTML = event.target.closest('.new-task__category-item').children[0].value;
	categoryItem.style.backgroundColor = event.target.closest('.new-task__category-item').children[1].value;

	toggleCategoriesBar();
}

function deleteCategory(event) {
	// event.stopPropagation();
	let categories = getCategories();
	const taskID = event.target.closest('.new-task__category-item').dataset?.id;
	// const taskName = event.target.closest('.new-task__category-item').querySelector('[type="text"]').value;
	categories = categories.filter(cat => cat.id !== taskID);
	setCategories(categories);
	refreshCategories();
}

function editCategory(event) {
	// event.stopPropagation();

	const item = event.target.closest('.new-task__category-item');
	const input = item.querySelector('.new-task__category-value');
	const color = item.querySelector('.new-task__category-color');
	const editButton = item.querySelector('.new-task__category-edit');
	const saveButton = item.querySelector('.new-task__category-save');
	const cancelButton = item.querySelector('.new-task__category-cancel');
	const deleteButton = item.querySelector('.new-task__category-delete');

	const categories = getCategories();

	item.removeEventListener('click', setCategory);

	input.removeAttribute('readonly');
	color.removeAttribute('disabled');
	editButton.style.display = 'none';
	saveButton.style.display = '';
	cancelButton.style.display = '';
	deleteButton.style.display = 'none';

	input.addEventListener('input', e => {
		if (categories.find(obj => obj.id !== item.dataset.id && obj.value === input.value)) {
			saveButton.setAttribute('disabled', 'disabled');
			input.style.color = 'red';
		} else {
			saveButton.removeAttribute('disabled');
			input.style.color = '';
		}
	})
	input.addEventListener('keyup', e => {
		if (e.code === 'Enter') {
			if (categories.find(obj => obj.value === input.value)) {
				saveButton.setAttribute('disabled', 'disabled');
				input.style.color = 'red';
			} else {
				saveButton.removeAttribute('disabled');
				input.style.color = '';
				saveEditedCategory(e);
			}
		}
	})

}

function cancelEditCategory(event) {
	event.stopPropagation();

	const item = event.target.closest('.new-task__category-item');
	const input = item.querySelector('.new-task__category-value');
	const color = item.querySelector('.new-task__category-color');
	const editButton = item.querySelector('.new-task__category-edit');
	const saveButton = item.querySelector('.new-task__category-save');
	const cancelButton = item.querySelector('.new-task__category-cancel');
	const deleteButton = item.querySelector('.new-task__category-delete');

	const categories = getCategories();
	const category = categories.find(obj => obj.id === item.dataset.id);

	input.style.color = '';
	input.value = category.value;
	color.value = category.color;

	input.setAttribute('readonly', 'readonly');
	color.setAttribute('disabled', 'disabled');

	editButton.style.display = '';
	saveButton.style.display = 'none';
	cancelButton.style.display = 'none';
	deleteButton.style.display = '';

	item.addEventListener('click', setCategory);
}

function saveEditedCategory(event) {
	event.stopPropagation();

	const item = event.target.closest('.new-task__category-item');
	const input = item.querySelector('[type="text"]');
	const color = item.querySelector('[type="color"]');
	const editButton = item.querySelector('.new-task__category-edit');
	const saveButton = item.querySelector('.new-task__category-save');
	const cancelButton = item.querySelector('.new-task__category-cancel');
	const deleteButton = item.querySelector('.new-task__category-delete');

	const categories = getCategories();
	const category = categories.find(cat => cat.id=== item.dataset.id);

	input.setAttribute('readonly', 'readonly');
	color.setAttribute('disabled', 'disabled');

	category.value = input.value;
	category.color = color.value;
	setCategories(categories);

	editButton.style.display = '';
	saveButton.style.display = 'none';
	cancelButton.style.display = 'none';
	deleteButton.style.display = '';

	item.addEventListener('click', setCategory);

	// refreshCategories();
}

function saveNewCategory(event) {
	const item = event.target.closest('.new-task__add-category');
	const input = item.querySelector('[type="text"]');

	if (!input.value) return;

	const color = item.querySelector('[type="color"]');

	let categories = getCategories();
	let maxOrder = Math.max(...(categories.map(item => item.order)));

	categories.push({value: input.value,
		id: uuidv4(),
		color: color.value,
		order: maxOrder + 1,
	})

	setCategories(categories);

	refreshCategories();
}

function cancelNewCategory(event) {

	const item = event.target.closest('.new-task__add-category');
	const input = item.querySelector('[type="text"]');
	const color = item.querySelector('[type="color"]');
	const add = item.querySelector('.new-task__category-add');
	const save = item.querySelector('.new-task__category-edit');
	const cancel = item.querySelector('.new-task__category-delete');

	input.value = '';
	input.style.display = 'none';
	color.value = '#7a7acc';
	color.style.display = 'none';
	add.style.display = '';
	save.style.display = 'none';
	cancel.style.display = 'none';
}

function countSymbolsLeft(event) {
	event.target.nextElementSibling.innerHTML = event.target.getAttribute('maxlength') - event.target.value.length + " symbol(s) left";
	// return event.target.getAttribute('maxlength') - event.target.value.length;
}

function dragCategoryItem(event) {
	// Разрешаем сбрасывать элементы в эту область
	event.preventDefault();

	// Находим перемещаемый элемент
	const activeElement = event.currentTarget.querySelector('._selected');
	// Находим элемент, над которым в данный момент находится курсор
	const currentElement = event.target.closest('.new-task__category-item');
	// Проверяем, что событие сработало:
	// 1. не на том элементе, который мы перемещаем,
	// 2. именно на элементе списка
	const isMoveable = activeElement !== currentElement &&
		currentElement.classList.contains('new-task__category-item');

	// Если нет, прерываем выполнение функции
	if (!isMoveable) {
		return;
	}

	// Находим элемент, перед которым будем вставлять
	const nextElement = (currentElement === activeElement.nextElementSibling) ?
		currentElement.nextElementSibling :
		currentElement;

	// Вставляем activeElement перед nextElement
	event.currentTarget.insertBefore(activeElement, nextElement);
}

function sortLocalStorageCategories() {
	let order = 0;
	const categories = document
		.querySelector('.new-task__category-list')
		.querySelectorAll('.new-task__category-item');
	const categoriesArr = Array.from(categories)
		.map(item => {
			return {value: item.children[0].value,
				id: item.dataset.id,
				color: item.children[1].value,
				order: ++order,
			}
		})

	setCategories(categoriesArr);
}

function addNewTask(event) {
	event.preventDefault();

	if (!event.target.elements['new-task-title'].value) {
		return;
	}

	let tasks = getTasks();

	const todo = {
		title: event.target.elements['new-task-title'].value,
		desc: event.target.elements['new-task-desc'].value,
		importance: event.target.elements['new-task-importance'].value,
		category: event.target.querySelector('.new-task__category-picker').innerHTML,
		color: event.target.querySelector('.new-task__category-picker').style.backgroundColor,
		expiryDate: event.target.elements['new-task-date'].value,
		done: false,
		dateCreated: new Date().getTime(),
	}

	tasks.push(todo);

	setTasks(tasks);

	rebuildMenu();

	displayTasks();
}

function rebuildMenu() {
	const formContainer = document.querySelector('.new-task__form-container');
	formContainer.innerHTML = '';

	formContainer.append(buildNewTaskColumn());
	formContainer.append(buildNewTaskOptionsColumn());
}

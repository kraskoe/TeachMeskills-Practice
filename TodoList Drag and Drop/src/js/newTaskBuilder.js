import {displayTasks} from './tasksHandler';
import {getCategories, setCategories, getTasks, setTasks} from './utils';
import { v4 as uuidv4 } from 'uuid';

function buildNewTaskSection() {
	const newTaskSection = document.createElement('section');
	const headerWrapper = document.createElement('div');
	const newTaskFormHeader = document.createElement('h3');
	const headerButton = document.createElement('span');
	const newTaskForm = document.createElement('form');
	const newTaskSubmitButton = document.createElement('button');
	const cancelNewTaskSubmitButton = document.createElement('button');
	const taskActionsContainer = document.createElement('div');
	const newTaskFormContainer = document.createElement('div');

	taskActionsContainer.classList.add('new-task__actions');

	newTaskSubmitButton.type = 'submit';
	newTaskSubmitButton.innerHTML = 'Add task';
	newTaskSubmitButton.classList.add('new-task__add-task');

	cancelNewTaskSubmitButton.type = 'button';
	cancelNewTaskSubmitButton.innerHTML = 'Cancel';
	cancelNewTaskSubmitButton.classList.add('new-task__cancel-task');

	newTaskFormHeader.innerHTML = 'Create a task';
	headerWrapper.classList.add('_header-wrapper');
	headerWrapper.append(newTaskFormHeader);
	headerButton.innerHTML = '+';
	headerWrapper.append(headerButton);

	newTaskFormContainer.classList.add('new-task__form-container');

	newTaskForm.id = 'new-task__form';
	newTaskForm.classList.add('new-task__form');
	newTaskForm.setAttribute('novalidate', 'novalidate');
	newTaskFormContainer.append(buildNewTaskColumn());
	newTaskFormContainer.append(buildNewTaskOptionsColumn());
	taskActionsContainer.append(newTaskSubmitButton, cancelNewTaskSubmitButton);
	newTaskForm.append(newTaskFormContainer, taskActionsContainer);

	newTaskSection.classList.add('new-task__section');
	newTaskSection.append(headerWrapper);

	newTaskSection.insertAdjacentHTML('beforeend', '<hr>');
	newTaskSection.append(newTaskForm);

	headerButton.addEventListener('click', e => {
		e.target.classList.toggle('_active');
		document.getElementById('new-task__form').classList.toggle('_active');
	})

	newTaskForm.addEventListener('submit', addNewTask);
	cancelNewTaskSubmitButton.addEventListener('click', rebuildMenu);

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
	const importanceLabels = ['Default', 'Important', 'Crucial'];

	newTaskImportanceOptions.classList.add('new-task__importance');

	for (let i = 0; i < 3; i++) {
		const newTaskImportanceItem = document.createElement('label');
		const newTaskImportanceRadio = document.createElement('input');
		const newTaskImportanceLabel = document.createElement('label');

		Object.assign(newTaskImportanceRadio, {
			type: 'radio',
			name: 'new-task-importance',
			id: `new-task-importance_${i + 1}`,
			value: i,
		})

		if (i === 0) {
			newTaskImportanceRadio.setAttribute('checked','checked');
		}

		newTaskImportanceLabel.setAttribute('for', `new-task-importance_${i + 1}`);
		newTaskImportanceLabel.classList.add('new-task__importance-label');
		newTaskImportanceLabel.innerHTML = importanceLabels[i];

		newTaskImportanceItem.classList.add('new-task__importance-item');
		newTaskImportanceItem.append(newTaskImportanceRadio);
		newTaskImportanceItem.append(newTaskImportanceLabel);

		newTaskImportanceOptions.append(newTaskImportanceItem);
	}

	return newTaskImportanceOptions;
}

function buildNewTaskCategoryOption(){
	const newTaskCategories = document.createElement('div');
	const newTaskCategory = document.createElement('div');
	const newTaskCategoryContainer = document.createElement('div');
	const categories = getCategories();
	const minOrder = Math.min(...(categories.map(obj => obj.order)));
	const defaultCategory = categories.find(obj => obj.order = minOrder);

	newTaskCategories.classList.add('new-task__category-wrapper');
	newTaskCategory.classList.add('new-task__category-picker');

	newTaskCategoryContainer.classList.add('new-task__category-container');

	newTaskCategoryContainer.append(returnCategories());
	newTaskCategoryContainer.append(returnNewCategory());
	newTaskCategories.append(newTaskCategory);
	newTaskCategories.append(newTaskCategoryContainer);

	newTaskCategory.addEventListener('click', toggleCategoriesBar);

	newTaskCategory.innerHTML = defaultCategory.value;
	newTaskCategory.style.backgroundColor = defaultCategory.color;
	newTaskCategory.dataset.id = defaultCategory.id;

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
	// if (event.defaultPrevented) return;

	const categoryItem = document.querySelector('.new-task__category-picker');
	const item = event.target.closest('.new-task__category-item');

	categoryItem.innerHTML = item.children[0].value;
	categoryItem.style.backgroundColor = item.children[1].value;
	categoryItem.dataset.id = item.dataset.id;

	toggleCategoriesBar();
}

function deleteCategory(event) {
	event.stopPropagation();
	let categories = getCategories();
	const taskID = event.target.closest('.new-task__category-item').dataset?.id;
	// const taskName = event.target.closest('.new-task__category-item').querySelector('[type="text"]').value;
	categories = categories.filter(cat => cat.id !== taskID);

	setCategories(categories);

	displayTasks();

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
			if (categories.find(obj => obj.id !== item.dataset.id && obj.value === input.value)) {
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

	const categoryItem = document.querySelector('.new-task__category-picker');
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

	if (categoryItem.dataset.id === item.dataset.id) {
		categoryItem.innerHTML = item.children[0].value;
		categoryItem.style.backgroundColor = item.children[1].value;
	}

	category.value = input.value;
	category.color = color.value;
	setCategories(categories);

	editButton.style.display = '';
	saveButton.style.display = 'none';
	cancelButton.style.display = 'none';
	deleteButton.style.display = '';

	item.addEventListener('click', setCategory);

	displayTasks();
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

	displayTasks();

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
		currentElement?.classList.contains('new-task__category-item');

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
	const categories = getCategories();
	const categoryID = event.target.querySelector('.new-task__category-picker').dataset.id;
	const maxOrder = Math.max(...categories.map(obj => obj.order));

	const todo = {
		id: uuidv4(),
		title: event.target.elements['new-task-title'].value,
		desc: event.target.elements['new-task-desc'].value,
		importance: event.target.elements['new-task-importance'].value,
		categoryID: categoryID,
		expiryDate: event.target.elements['new-task-date'].value,
		done: false,
		dateCreated: new Date().getTime(),
		order: maxOrder + 1,
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

export {buildNewTaskSection, refreshCategories, displayTasks};
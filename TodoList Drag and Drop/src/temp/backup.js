export {buildNewTaskSection};

function buildNewTaskSection() {
	const newTaskSection = document.createElement('section');
	const newTaskFormHeader = document.createElement('h3');
	const newTaskForm = document.createElement('form');

	newTaskFormHeader.innerHTML = 'Create a task';

	newTaskForm.id = 'new-task__form';
	newTaskForm.classList.add('new-task__form');
	newTaskForm.append(buildNewTaskColumn());
	newTaskForm.append(buildNewTaskOptionsColumn());

	newTaskSection.classList.add('new-task__section');
	newTaskSection.append(newTaskFormHeader);
	newTaskSection.insertAdjacentHTML('beforeend', '<hr>');
	newTaskSection.append(newTaskForm);

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
		checked: 'checked',
	})
	Object.assign(newTaskImportanceRadioInput2, {
		type: 'radio',
		name: 'new-task-importance',
		id: 'new-task-importance_2',
	})
	Object.assign(newTaskImportanceRadioInput3, {
		type: 'radio',
		name: 'new-task-importance',
		id: 'new-task-importance_3',
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
	const newTaskCategorySelect = document.createElement('input');
	const newTaskCategoryColor = document.createElement('input');
	const newTaskCategoryContainer = document.createElement('div');

	newTaskCategory.classList.add('new-task__category-wrapper')
	newTaskCategoryContainer.classList.add('new-task__category-container')

	Object.assign(newTaskCategorySelect, {
		type: 'text',
		name: 'task-category',
		value: 'General',
	})
	newTaskCategorySelect.classList.add('new-task__category')
	newTaskCategorySelect.setAttribute('readonly', 'readonly');

	Object.assign(newTaskCategoryColor, {
		type: 'color',
		name: 'category-color',
		value: '#7a7acc',
		disabled: 'disabled',
	})
	newTaskCategoryColor.classList.add('new-task__category-color');

	newTaskCategoryContainer.append(returnCategories());
	newTaskCategoryContainer.append(returnNewCategory());
	newTaskCategory.append(newTaskCategorySelect);
	newTaskCategory.append(newTaskCategoryColor);
	newTaskCategories.append(newTaskCategory);
	newTaskCategories.append(newTaskCategoryContainer);

	newTaskCategory.addEventListener('click', toggleCategoriesBar);

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

	newCategoryItem.classList.add('new-task__add-category');
	newCategoryInput.classList.add('new-task__category-value', 'new-task__category-value_narrow');
	newCategoryColor.classList.add('new-task__category-color');

	Object.assign(newCategoryInput, {
		type: 'text',
		name: 'category-value',
		placeholder: 'Type category name',
	})
	newCategoryInput.style.display = 'none';

	Object.assign(newCategoryColor, {
		type: 'color',
		name: 'category-color',
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

		newCategoryInput.addEventListener('keyup', e => {
			if (e.code === 'Escape') cancelNewCategory(e);
		})
		newCategoryInput.addEventListener('keyup', e => {
			if (e.code === 'Enter') saveNewCategory(e);
		})
		newCategorySaveButton.addEventListener('click', e => saveNewCategory(e));
		newCategoryCancelButton.addEventListener('click', e => cancelNewCategory(e));
	})

	return newCategoryItem;
}

function getCategories() {
	const defaultCategories = [
		{value: 'General', color: '#7a7acc', order: '01',},
		{value: 'Car', color: '#56bf9c', order: '02',},
		{value: 'Cooking', color: '#d96da1', order: '03',},
		{value: 'Home', color: '#b17acc', order: '04',},
		{value: 'Ideas', color: '#ffaa33', order: '05',},
		{value: 'Payments', color: '#ca5463', order: '06',},
		{value: 'Purchases', color: '#7acc52', order: '07',},
		{value: 'Travel', color: '#348ce1', order: '09',},
		{value: 'Work', color: '#a3b8cc', order: '08',},
	];
	return  JSON.parse(localStorage
		.getItem('categories'))
		?.sort((obj1, obj2) => obj1.order - obj2.order) || defaultCategories;
}

function setCategories(category) {
	localStorage.setItem('categories', JSON.stringify(category));
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
	categoryItem.draggable = true;

	const categoryInput = document.createElement('input');
	const categoryColor = document.createElement('input');
	const categoryEditButton = document.createElement('button');
	const categoryDeleteButton = document.createElement('button');

	categoryInput.classList.add('new-task__category-value');
	Object.assign(categoryInput, {
		type: 'text',
		name: 'category-value',
		value: category.value,
	})
	categoryInput.setAttribute('readonly', 'readonly');

	Object.assign(categoryColor, {
		type: 'color',
		name: 'category-color',
		value: category.color,
		disabled: 'disabled',
	})
	categoryColor.classList.add('new-task__category-color');

	categoryEditButton.classList.add('new-task__category-edit');
	categoryEditButton.setAttribute('type', 'button');
	categoryEditButton.innerHTML = 'Edit';
	categoryDeleteButton.classList.add('new-task__category-delete');
	categoryDeleteButton.setAttribute('type', 'button');
	categoryDeleteButton.innerHTML = 'Delete';


	categoryItem.append(categoryInput,
		categoryColor,
		categoryEditButton,
		categoryDeleteButton);

	categoryItem.addEventListener('click', setCategory);

	categoryEditButton.addEventListener('click', e => editCategory(e));

	categoryDeleteButton.addEventListener('click', e => deleteCategory(e));

	return categoryItem;
}

function toggleCategoriesBar() {
	document.querySelector('.new-task__category-container').classList.toggle('_active');
}

function setCategory(event) {
	const categoryInput = document.querySelector('.new-task__category');
	const categoryColor = document.querySelector('.new-task__category-color');

	categoryInput.value = event.currentTarget.children[0].value;
	categoryColor.value = event.currentTarget.children[1].value;

	toggleCategoriesBar();
}

function deleteCategory(event) {
	event.stopPropagation();
	let categories = getCategories();
	const taskName = event.target.closest('.new-task__category-item').querySelector('[type="text"]').value;
	categories = categories.filter(cat => cat.value !== taskName);
	setCategories(categories);
	refreshCategories();
}

function editCategory(event) {
	event.stopPropagation();

	const item = event.target.closest('.new-task__category-item');
	const input = item.querySelector('[type="text"]');
	const color = item.querySelector('[type="color"]');
	const edit = item.querySelector('.new-task__category-edit');
	const inputValue = input.value;
	const colorValue = color.value;

	item.removeEventListener('click', setCategory);
	input.removeAttribute('readonly');
	color.removeAttribute('disabled');
	edit.innerHTML = 'Save';
	edit.style.backgroundColor = '#ff5b57';

	input.addEventListener('blur', e => saveEditedCategory(e, inputValue));
	input.addEventListener('keyup', e => {
		if (e.code === 'Enter') saveEditedCategory(e, inputValue);
	})
	edit.addEventListener('click', e => saveEditedCategory(e, inputValue));
}

function saveEditedCategory(event,prevValue) {
	let categories = getCategories();
	const category = categories.find(cat => cat.value === prevValue);

	const item = event.target.closest('.new-task__category-item');
	const input = item.querySelector('[type="text"]');
	const color = item.querySelector('[type="color"]');
	const edit = item.querySelector('.new-task__category-edit');

	input.setAttribute('readonly', 'readonly');
	color.setAttribute('disabled', 'disabled');
	category.value = input.value;
	category.color = color.value;
	setCategories(categories);
	edit.innerHTML = 'Edit';
	edit.style.backgroundColor = '';
	refreshCategories();
}

function saveNewCategory(event) {
	const item = event.target.closest('.new-task__add-category');
	const input = item.querySelector('[type="text"]');

	if (!input.value) return;

	const color = item.querySelector('[type="color"]');
	const add = item.querySelector('.new-task__category-add');
	const save = item.querySelector('.new-task__category-edit');
	const cancel = item.querySelector('.new-task__category-delete');

	let categories = getCategories();
	let maxOrder = Math.max(...(categories.map(item => item.order)));

	categories.push({value: input.value,
		color: color.value,
		order: maxOrder + 1,
	})

	setCategories(categories);

	input.style.display = 'none';
	color.style.display = 'none';
	add.style.display = '';
	save.style.display = 'none';
	cancel.style.display = 'none';

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
				color: item.children[1].value,
				order: ++order,
			}
		})

	setCategories(categoriesArr);
}
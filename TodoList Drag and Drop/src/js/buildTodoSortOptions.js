import {displayTasks} from "./tasksHandler";

function buildSortOptions() {
	const sortOptions = document.createElement('div');
	const filterClosedCheckbox = document.createElement('input');
	const filterClosedLabel = document.createElement('label');
	const sortTitle = document.createElement('div');
	const sortButtons = ['Order', 'Importance', 'Category', 'Expiry date'];

	sortOptions.classList.add('todo__sort-options');

	filterClosedCheckbox.type = 'checkbox';
	filterClosedCheckbox.id ='todo__closed-checkbox';
	filterClosedCheckbox.classList.add('todo__closed-checkbox');
	filterClosedLabel.classList.add('todo__closed-label');
	filterClosedLabel.setAttribute('for', 'todo__closed-checkbox');
	filterClosedLabel.innerHTML = 'Show closed';

	sortTitle.classList.add('_spaced');
	sortTitle.innerHTML = 'Sort tasks by:';

	sortOptions.append(filterClosedCheckbox, filterClosedLabel, sortTitle);

	for (let i = 0; i < 4; i++) {
		const sortItemLabel = document.createElement('label');
		const sortItemRadio = document.createElement('input');

		sortItemLabel.classList.add('todo__sort-label');
		sortItemLabel.setAttribute('for', `todo__sort-radio_${i}`);
		sortItemLabel.innerHTML = sortButtons[i];

		sortItemRadio.classList.add('todo__sort-radio');
		sortItemRadio.type = 'radio';
		sortItemRadio.name = 'todo__sort-radio';
		sortItemRadio.id = `todo__sort-radio_${i}`;

		if (i === 0) sortItemRadio.checked = true;

		sortOptions.append(sortItemRadio, sortItemLabel);
	}

	sortOptions.addEventListener('click', e => {
		if (e.target.classList.contains('todo__closed-checkbox') || e.target.classList.contains('todo__sort-radio')) {
			displayTasks();
		}
	})

	return sortOptions;
}

export {buildSortOptions};
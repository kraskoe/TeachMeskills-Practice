'use strict'
import './style.css';

let todos;

window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const nameInput = document.getElementById('name');
	const newTodoForm = document.getElementById('new-todo-form');

	const username = localStorage.getItem('username') || 'Guest';

	nameInput.value = username;

	nameInput.addEventListener('change', e => {
		localStorage.setItem('username', e.target.value);
	})

	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();

		if (!e.target.elements.content.value) {
			return;
		}

		const todo = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime()
		}

		todos.push(todo);

		localStorage.setItem('todos', JSON.stringify(todos));

		e.target.reset();

		displayTodos();
	})

	displayTodos();
})

function displayTodos() {
	const todoList = document.getElementById('todo-list');

	todoList.innerHTML = '';

	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const editButton = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble', todo.category);
		content.classList.add('todo-content');
		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`
		actions.classList.add('actions');
		editButton.classList.add('edit');
		editButton.innerHTML = 'Edit';
		deleteButton.classList.add('delete');
		deleteButton.innerHTML = 'Delete';

		label.append(input, span);
		actions.append(editButton, deleteButton);
		todoItem.append(label, content, actions);
		todoList.append(todoItem);

		if (todo.done) {
			todoItem.classList.add('done');
		}

		input.addEventListener('click', e => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			todoItem.classList.toggle('done');

			displayTodos();
		})

		editButton.addEventListener('click', e => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', e => saveEditedTask(e, input, todo));
			input.addEventListener('keyup', e => {
				if (e.code === 'Enter') saveEditedTask(e, input, todo);
			})
		})

		deleteButton.addEventListener('click', e => {
			todos = todos.filter(t => t !== todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			displayTodos();
		})

	})
}

function saveEditedTask(event, input, todo) {
	input.setAttribute('readonly', true);
	todo.content = event.target.value;
	localStorage.setItem('todos', JSON.stringify(todos));
	displayTodos();
}

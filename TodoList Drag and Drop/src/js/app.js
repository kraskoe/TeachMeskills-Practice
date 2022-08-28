import '../css/style.css';
import '../css/greeting.css';
import '../css/new-task.css';
import '../css/todo-list.css';
import '../css/sort-options.css';
import {accessUserName, buildGreetingSection} from './greetingBuilder';
import {buildNewTaskSection} from './newTaskBuilder';
import {buildTodoSection, displayTasks} from './tasksHandler';


window.addEventListener('DOMContentLoaded', () => {
	embedSection(buildGreetingSection());
	accessUserName();

	embedSection(buildNewTaskSection());

	embedSection(buildTodoSection());
	displayTasks();
});

function embedSection(section) {
	const root = document.getElementById('root');
	root.append(section);
}






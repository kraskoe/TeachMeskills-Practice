import './style.css';
import './greeting.css';
import './new-task.css';
import './todo-list.css';
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






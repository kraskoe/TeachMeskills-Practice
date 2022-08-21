import './style.css';
import './greeting.css';
import './new-task.css';
import {accessUserName, buildGreetingSection} from './greetingBuilder';
import {buildNewTaskSection} from './newTaskBuilder';


window.addEventListener('DOMContentLoaded', () => {
	embedSection(buildGreetingSection());
	accessUserName();

	embedSection(buildNewTaskSection());
});

function embedSection(section) {
	const root = document.getElementById('root');
	root.append(section);
}






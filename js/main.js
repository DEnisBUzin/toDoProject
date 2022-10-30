const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector('#emptyList');
const listWork = document.querySelector("#empty-list__title");

let tasks = [];

if (localStorage.getItem("tasks")) {
		tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(function (task) {
	renderCode(task);
});

//add a task
form.addEventListener('submit', addTask);

//del a task
tasksList.addEventListener('click', deleteTask);

//Done the task
tasksList.addEventListener('click', doneTask);


//FUNCTIONS
function addTask(event) {
	//cancel restart
	event.preventDefault();
	//get the text
	const taskText = taskInput.value

	const newTask = {
		id: Date.now(),
		text: taskText,
		done: false
	};

	tasks.push(newTask);
	saveToLS();
	renderCode(newTask);
	
	taskInput.value = '';
	taskInput.focus();
}

function deleteTask(event) {
	if (event.target.dataset.action != 'delete') return;
	//find  class in event
	const parentNote = event.target.closest('.list-group-item');

	//write index in const
	const idTask = Number(parentNote.id);

	//find index in array and compare
	const indexTask = tasks.findIndex((task) => task.id === idTask);
	
	//delete task in array
	tasks.splice(indexTask, 1);
	
	parentNote.remove();
	saveToLS();

	if (tasks.length === 0){
		listWork.textContent = 'Список дел пуст'
	}
}

function doneTask(event){
	if (event.target.dataset.action !== 'done') return;

	const parentNode = event.target.closest('.list-group-item');

	const idTask = Number(parentNode.id);
	
	const task = tasks.find((task) => task.id === idTask);
	task.done = !task.done;
	saveToLS();

	const taskTitle = parentNode.querySelector('.task-title');
	taskTitle.classList.toggle('task-title--done');
	
	// saveToLs();
}

function saveToLS() {
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderCode(xTask){
	const cssClass = xTask.done ? 'task-title task-title--done' : 'task-title';
 
	//make marking for new task
	const taskHTML = `<li id = "${xTask.id}" class="list-group-item d-flex justify-content-between task-item">
									<span class="${cssClass}">${xTask.text}</span>
										<div class="task-item__buttons">
											<button type="button" data-action="done" class="btn-action">
												<img src="./img/tick.svg" alt="Done" width="18" height="18">
											</button>
											<button type="button" data-action="delete" class="btn-action">
												<img src="./img/cross.svg" alt="Done" width="18" height="18">
											</button>
										</div>
					    </li> `;
	//add task in form
	tasksList.insertAdjacentHTML('beforeend', taskHTML);
	if (tasksList.children.length > 1 ){
		listWork.textContent = 'Список дел на сегодня:';
	}
}
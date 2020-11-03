class Todo {
	constructor() {
		this.list = document.querySelector('ul');

		const proxyHandle = {
			set: (target, property, value) =>
				this.proxySetHandle(target, property, value),
		};

		this.tasks = this.getTasks();
		this.proxyTasks = new Proxy(this.tasks, proxyHandle);

		this.renderTask();

		const buttonAdd = document.querySelector('#add');
		buttonAdd.onclick = () => this.createTask();

<<<<<<< HEAD
		const buttonRemove = document.querySelector('#removeAll');
		buttonRemove.onclick = () => this.removeAllTasks();
		if(this.proxyTasks < 2)  {
				$("#removeAll").hide();
		}
=======
		// const buttonRemove = document.querySelector('#removeAll');
		// buttonRemove.onclick = () => this.removeAllTasks();
		// if(this.tasks < 2)  {
		// 		$("#removeAll").hide();
		// }
>>>>>>> 703d67cae66548a32b927d66f5b508d0a09e9132
	}

	taskSchema(status, name) {
		const wrapper = document.createElement('li');
		wrapper.classList.toggle('list-group-item');
		if(status==true){
			wrapper.classList.toggle('checked');
		}
		wrapper.innerHTML = (`
			<input type="checkbox" ${status ? 'checked' : null}>
			<span>${name}</span>

			<i class='btn btn-danger close'>x</i>

		`);
		return wrapper;
	}

	taskChangeStatus(index, status) {}

	getTasks() {
		return localStorage.getItem('tasks')
			? JSON.parse(localStorage.getItem('tasks'))
			: []
	}
	saveTasks() {
		localStorage.setItem('tasks', JSON.stringify(this.tasks));
	}
	createTask() {
		event.preventDefault();                                       
    event.stopPropagation();                                        
    const name = $("input").val();                                    
    if (name !=="") {                                               
			//const name = prompt('Введите название задания');
			//if (name.length <= 0 || name.length > 100) return;
			this.proxyTasks.push({
				status: false,
				name
			});
			$("input").val("");
	}
	}

	changeTaskStatus(index, status) {
		this.proxyTasks[index].status = status;
		//const task = this.list.querySelector('li');
		//task.setAttribute('class','checked');
		//this.list.children[index].
		if(status==true){
			this.list.children[index].classList.toggle('checked');
		}else{
			this.list.children[index].classList.remove('checked');
		}
		this.saveTasks();
	}
	removeTask(index) {
		this.proxyTasks.splice(index, 1);
	}

	removeAllTasks(){
		this.proxyTasks.splice(0,this.proxyTasks.length);
	}

	renderTask() {
		this.list.innerHTML = '';
		this.tasks.forEach(task => {
			const schema = this.taskSchema(
				task.status,
				task.name
			);

		//	var elem = $("<li class='list-group-item'>");     // prepare the elment to diplay for a new task
		//	$(elem).append("</div></li>");
		//	this.list.appendChild(elem);                 // append the new task element to mylist element
			//let textNodeName = document.createTextNode(name);
			this.list.appendChild(schema);
		});

		const tasks = this.list.querySelectorAll('li');

		tasks.forEach((task, index) => {
			let status = task.querySelector('input');
			//const stringTask = task.querySelector('span')
			const remove = task.querySelector('i');

			task.onclick = ()=> {
				if(status)	status = false;
				else status = true;
				this.changeTaskStatus(index, status);
			}

		//	status.onchange = (e) =>//{
			//	this.changeTaskStatus(index, e.target.checked);
				//this.target.classList.toggle('checked');
				//task.setAttribute('class','checked');
		//	}

			remove.onclick = () => this.removeTask(index);
		});
	}

	proxySetHandle(target, property, value) {
		target[property] = value;
		this.saveTasks();
		this.renderTask();
		return true;
	}
}

new Todo();

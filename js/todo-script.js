class Todo {
	constructor() {
		this.list = document.querySelector('ul');

		const proxyHandle = {
			set: (target, property, value) =>
				this.proxySetHandle(target, property, value),
		};

		this.tasks = this.getTasks();
		this.proxyTasks = new Proxy(this.tasks, proxyHandle);

		this.idCounter = this.tasks.length;

		this.renderTask();

		/*const tasksListElement = document.querySelector(`.list-group`);

		tasksListElement.addEventListener(`dragstart`, (evt) => {
		  evt.target.classList.add(`selected`);
		  console.log(evt);
		})
		tasksListElement.addEventListener(`dragend`, (evt) => {

			const activeElement = tasksListElement.querySelector(`.selected`);
			//let index = this.tasks.indexOf(activeElement.children[1].innerText,0);
			let name = activeElement.children[1].innerText;
			let index = this.tasks.findIndex(item => item.name == name);
			if(index!= -1){
				this.tasks.splice(index,0, this.tasks[index]);
				removeTask(index);
			}
			/*forEach((this.proxyTasks, index) => {
				if(activeElement.children[1].innerText == this.proxyTasks[index]){
					this.proxyTasks.splice(index-1,0, activeElement.children[1].innerText)
				}
			});*/

		  //localStorage.setItem('tasks', JSON.stringify(this.tasks));
		/*	this.saveTasks();
			evt.target.classList.remove(`selected`);
		});
		const getNextElement = (cursorPosition, currentElement) => {
		  // Получаем объект с размерами и координатами
		  const currentElementCoord = currentElement.getBoundingClientRect();
		  // Находим вертикальную координату центра текущего элемента
		  const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

		  // Если курсор выше центра элемента, возвращаем текущий элемент
		  // В ином случае — следующий DOM-элемент
		  const nextElement = (cursorPosition < currentElementCenter) ?
		      currentElement :
		      currentElement.nextElementSibling;

		  return nextElement;
		};
		tasksListElement.addEventListener(`dragover`, (evt) => {
		  evt.preventDefault();

		  const activeElement = tasksListElement.querySelector(`.selected`);
		  const currentElement = evt.target;
		  const isMoveable = activeElement !== currentElement &&
		    currentElement.classList.contains(`list-group-item`);

		  if (!isMoveable) {
		    return;
		  }

		  // evt.clientY — вертикальная координата курсора в момент,
		  // когда сработало событие
		  const nextElement = getNextElement(evt.clientY, currentElement);

		  // Проверяем, нужно ли менять элементы местами
		  if (
		    nextElement &&
		    activeElement === nextElement.previousElementSibling ||
		    activeElement === nextElement
		  ) {
		    // Если нет, выходим из функции, чтобы избежать лишних изменений в DOM
		    return;
		  }

		  tasksListElement.insertBefore(activeElement, nextElement);
		});
		*/

		const buttonAdd = document.querySelector('#add');
		buttonAdd.onclick = () => this.createTask();

		const buttonRemove = document.querySelector('#removeAll');
		buttonRemove.onclick = () => this.removeAllTasks();
	}

	taskSchema(task) {
		const wrapper = document.createElement('li');
		wrapper.setAttribute('id', task.id);
		wrapper.classList.toggle('list-group-item');
		wrapper.draggable = true;
		if(task.status==false){
			wrapper.classList.toggle('checked');
		}
		//document.getElementById('edit-id').value = country.id;
		wrapper.innerHTML = (`
			<input type="checkbox" class='task-status' ${task.status ? 'checked' : ' '}/>
			<input type="hidden" class ='task-id' value= '${task.id}'>
			<span id='task-name'>${task.name}</span>

			<i class='btn btn-danger close'>x</i>

		`);
		wrapper.getElementsByClassName('task-id')[0].value = task.id;
		return wrapper;
		//wrapper.append(this.list);
		//this.list.appendChild(wrapper);
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
		event.preventDefault();                                         // prevent the default action of the event
    event.stopPropagation();                                        // stop the event from the building up the other elements
    const name = $("input").val().trim();                                    // get the value from the input
    if (name !=="") {                                               // check if the input value is not empty
			this.idCounter++;
			let task = {
				id: this.idCounter,
				status: false,
				name
			}
			this.proxyTasks.push(task);
			//const schema =
			//this.taskSchema(task);
			//this.list.appendChild(schema);
			//this.saveTasks();
			$("input").val("");
	}
	}

	changeTaskStatus(index, taskstatus) {
		let status = taskstatus.checked;   //true;
		//if(taskstatus)	status = false;
		//else status = true;
		this.proxyTasks[index].status = status;
		//const task = this.list.querySelector('li');
		//task.setAttribute('class','checked');
		//this.list.children[index].
		if(status==true){
			this.list.children[index].classList.toggle('checked');
			//document.getElementsByClassName('task-status')[index] = status;
		}else{
			this.list.children[index].classList.remove('checked');
		}
		//document.getElementsByClassName('task-status')[index].checked = status;
		//this.saveTasks();
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
			const schema =
			this.taskSchema(  task);
				//task.status,
				//task.name
			//);

			this.list.appendChild(schema);

		});

		/*const tasksListElement = this.list;// document.querySelector(`.list-group`);
		tasksListElement.dragstart = (evt) => {
		  evt.target.classList.add(`selected`);
			console.log(task);
		}
		tasksListElement.dragend = ()=> {
			this.task.target.classList.remove(`selected`);
			this.saveTasks();
		}
		tasksListElement.dragover =()=> {
			this.preventDefault();

			const activeElement = this.task.querySelector(`.selected`);
			const currentElement = this.task.target;
			const isMoveable = activeElement !== currentElement &&
				currentElement.classList.contains(`list-group-item`);

			if (!isMoveable) {
				return;
			}

			// evt.clientY — вертикальная координата курсора в момент,
			// когда сработало событие
			const nextElement = getNextElement(this.task.clientY, currentElement);

			// Проверяем, нужно ли менять элементы местами
			if (
				nextElement &&
				activeElement === nextElement.previousElementSibling ||
				activeElement === nextElement
			) {
				// Если нет, выходим из функции, чтобы избежать лишних изменений в DOM
				return;
			}

			this.task.insertBefore(activeElement, nextElement);
		}*/

		const tasks = this.list.querySelectorAll('li'); //this.list.childNodes;

		tasks.forEach((task, index) => {
			let status = task.querySelector('input');
			//const stringTask = task.querySelector('span')
			const remove = task.querySelector('i');

			task.onclick = ()=> {
				//console.log(task);
				/*if(status)	status = false;
				else status = true;*/
				this.changeTaskStatus(index, status);
			}

			remove.onclick = () => this.removeTask(index);
		});
	}

	orderTasks(){
		let orderedTasks = [];
		const tasks = this.list.getElementsByTagName('li');
		//tasks.forEach((task, index) => {

		for (let task of tasks) {
			let id = task.getElementsByClassName('task-id')[0].value;
			let st = task.getElementsByClassName('task-status')[0];
			let ordtask = {
				id : task.getElementsByClassName('task-id')[0].value,
				name : task.getElementsByTagName('span')[0].innerText,//task.querySelector('#task-name'),
				status : task.getElementsByClassName('task-status')[0].checked
			}
			orderedTasks.push(ordtask);
		};
		this.tasks = orderedTasks;
		this.saveTasks();
	}

	proxySetHandle(target, property, value) {
		target[property] = value;
		this.saveTasks();
		this.renderTask();
		return true;
	}
}




class Dnd extends Todo{
  constructor(list) {
  super(list); //document.querySelector(`.list-group`);
  //const taskElements = tasksListElement.querySelectorAll(`.list-group-item`);
	//this.list = document.querySelector('ul');
  this.nextElementE = undefined;

	this.getNextElement = (cursorPosition, currentElement) => {
   // Получаем объект с размерами и координатами
   const currentElementCoord = currentElement.getBoundingClientRect();
   // Находим вертикальную координату центра текущего элемента
   const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

   // Если курсор выше центра элемента, возвращаем текущий элемент
   // В ином случае — следующий DOM-элемент
   const nextElement = (cursorPosition < currentElementCenter) ?
       currentElement :
       currentElement.nextElementSibling;

   return nextElement;
 };


  this.list.ondragstart = (evt) => {
    evt.target.classList.add(`selected`);
    //console.log(evt);
  }

  this.list.ondragend = (evt) => {
    evt.target.classList.remove(`selected`);
    //localStorage.setItem('tasks', JSON.stringify(this.tasks));
      //console.log("next=======!",this.nextElementE);
		/*	Попытки сохранить порядок
		let idCur = evt.target.attributes[0].value;//children[1].value;
			let indexCur = this.tasks.findIndex(item => item.id == idCur);
			// this.list.children[0].children[1].value = nextElementE.children[1].value = id
			let idNext = this.nextElementE.attributes[0].value;  //children[1].value;
			let indexNext = this.tasks.findIndex(item => item.id == idNext);

			if(indexNext==0) indexNext=1;
			if(indexNext!= -1){
				//this.tasks.splice(indexCur, 1);
				this.tasks.splice(indexNext-1,0, this.tasks[indexCur]);
				//this.removeTask(indexCur-1);
				//this.tasks.splice(indexCur, 1);

			}
			this.saveTasks();
			*/
			this.orderTasks();
      this.nextElementE = undefined;
  }



  this.list.ondragover = (evt) => {
    evt.preventDefault();

    const activeElement = this.list.querySelector(`.selected`);
    const currentElement = evt.target;
    const isMoveable = activeElement !== currentElement &&
      currentElement.classList.contains(`list-group-item`);

    if (!isMoveable) {
      return;
    }

    // evt.clientY — вертикальная координата курсора в момент,
    // когда сработало событие
    const nextElement = this.getNextElement(evt.clientY, currentElement);
    //console.log(nextElement);

    // Проверяем, нужно ли менять элементы местами
    if (
      nextElement &&
      activeElement === nextElement.previousElementSibling ||
      activeElement === nextElement
    ) {
      // Если нет, выходим из функции, чтобы избежать лишних изменений в DOM
      return;
    }

    //console.log("next!",nextElement);
    this.nextElementE = nextElement;
    this.list.insertBefore(activeElement, nextElement);
  }
}
}



new Todo();
new Dnd(Todo.list);

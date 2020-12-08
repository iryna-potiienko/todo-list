const tasksListElement = document.querySelector(`.list-group`);
const taskElements = tasksListElement.querySelectorAll(`.list-group-item`);
let nextElementE = undefined;

// Перебираем все элементы списка и присваиваем нужное значение
for (const task of taskElements) {
  task.draggable = true;
}
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
tasksListElement.addEventListener(`dragstart`, (evt) => {
  evt.target.classList.add(`selected`);
  //console.log(evt);
})

tasksListElement.addEventListener(`dragend`, (evt) => {
  evt.target.classList.remove(`selected`);
  //localStorage.setItem('tasks', JSON.stringify(this.tasks));
    console.log("next=======!",nextElementE);
    nextElementE = undefined;
});



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
  nextElement = getNextElement(evt.clientY, currentElement);
  console.log(nextElement);

  // Проверяем, нужно ли менять элементы местами
  if (
    nextElement &&
    activeElement === nextElement.previousElementSibling ||
    activeElement === nextElement
  ) {
    // Если нет, выходим из функции, чтобы избежать лишних изменений в DOM
    return;
  }

  console.log("next!",nextElement);
  nextElementE = nextElement;
  tasksListElement.insertBefore(activeElement, nextElement);
});

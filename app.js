// Получаем основные элементы из DOM
const taskInput = document.getElementById("new-task"); // Поле для ввода новой задачи
const addButton = document.querySelector(".main-form__button");
const incompleteTaskHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");

// Функция создания новой задачи
const createNewTaskElement = function (taskString) {
    const listItem = document.createElement("div");
    listItem.className = "main-form__item";

    // Элементы задачи
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "main-form__input main-form__checkbox";

    const label = document.createElement("label");
    label.className = "main-form__label";
    label.innerText = taskString;

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "main-form__input main-form__input_task";

    const editButton = document.createElement("button");
    editButton.className = "main-form__button main-form__edit";
    editButton.innerText = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.className = "main-form__button main-form__delete";
    const deleteImg = document.createElement("img");
    deleteImg.src = "./remove.svg";
    deleteImg.alt = "remove";
    deleteButton.appendChild(deleteImg);

    // Добавляем элементы в listItem
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
};

// Функция добавления новой задачи
const addTask = function () {
    if (!taskInput.value.trim()) return; // Проверка на пустой ввод
    const listItem = createNewTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = ""; // Очистка поля ввода
};

// Функция редактирования задачи
const editTask = function () {
    const listItem = this.parentNode;
    const editInput = listItem.querySelector(".main-form__input_task");
    const label = listItem.querySelector(".main-form__label");
    const editButton = listItem.querySelector(".main-form__edit");

    const isEditMode = listItem.classList.contains("main-form__edit_mode");

    if (isEditMode) {
        // Сохранить изменения
        label.innerText = editInput.value;
        editButton.innerText = "Edit";
    } else {
        // Войти в режим редактирования
        editInput.value = label.innerText;
        editButton.innerText = "Save";
    }

    listItem.classList.toggle("main-form__edit_mode");
};

// Функция удаления задачи
const deleteTask = function () {
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem);
};

// Функция переноса задачи в "Completed"
const taskCompleted = function () {
    const listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};

// Функция переноса задачи обратно в "Incomplete"
const taskIncomplete = function () {
    const listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

// Привязка событий к элементам задачи
const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    const checkBox = taskListItem.querySelector(".main-form__checkbox");
    const editButton = taskListItem.querySelector(".main-form__edit");
    const deleteButton = taskListItem.querySelector(".main-form__delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
};

// Добавление событий для кнопки Add
addButton.addEventListener("click", addTask);

// Инициализация существующих задач
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Установка режима редактирования для второй задачи при загрузке
document.addEventListener("DOMContentLoaded", () => {
    const secondTask = incompleteTaskHolder.querySelector(".main-form__edit_mode");

    if (secondTask) {
        const editInput = secondTask.querySelector(".main-form__input_task");
        const label = secondTask.querySelector(".main-form__label");
        const editButton = secondTask.querySelector(".main-form__edit");

        editInput.value = label.innerText;
        editButton.innerText = "Save";
    }
});

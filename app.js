const taskInput = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];
const incompleteTaskHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");

const createNewTaskElement = (taskText) => {
    const listItem = document.createElement("div");
    listItem.className = "main-form__item";

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "main-form__checkbox";

    const label = document.createElement("label");
    label.className = "main-form__label";
    label.innerText = taskText;

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "main-form__input_task";
    editInput.style.display = "none";

    const editButton = document.createElement("button");
    editButton.className = "main-form__button main-form__edit";
    editButton.innerText = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.className = "main-form__button main-form__delete";
    const deleteIcon = document.createElement("img");
    deleteIcon.src = "./remove.svg";
    deleteIcon.alt = "remove";
    deleteButton.appendChild(deleteIcon);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
};

const addTask = () => {
    const taskText = taskInput.value.trim();
    if (!taskText) {
        alert("Task cannot be empty!");
        return;
    }

    const listItem = createNewTaskElement(taskText);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
};

const editTask = function () {
    const listItem = this.parentNode;
    const label = listItem.querySelector(".main-form__label");
    const editInput = listItem.querySelector(".main-form__input_task");
    const isEditMode = listItem.classList.contains("editMode");

    if (isEditMode) {
        const newText = editInput.value.trim();
        if (newText) {
            label.innerText = newText;
        }
        this.innerText = "Edit";
        label.style.display = "block";
        editInput.style.display = "none";
    } else {
        editInput.value = label.innerText;
        this.innerText = "Save";
        label.style.display = "none";
        editInput.style.display = "block";
    }

    listItem.classList.toggle("editMode");
};

const deleteTask = function () {
    const listItem = this.parentNode;
    listItem.parentNode.removeChild(listItem);
};

const taskCompleted = function () {
    const listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
    const listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

const bindTaskEvents = (taskListItem, checkBoxHandler) => {
    const checkBox = taskListItem.querySelector(".main-form__checkbox");
    const editButton = taskListItem.querySelector(".main-form__edit");
    const deleteButton = taskListItem.querySelector(".main-form__delete");

    checkBox.onchange = checkBoxHandler;
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
};

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

addButton.addEventListener("click", addTask);

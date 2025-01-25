/* JavaScript for Interactive To-Do List */
const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const filterSelect = document.getElementById('filter');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();

addTaskButton.addEventListener('click', addTask);
filterSelect.addEventListener('change', renderTasks);

document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
});

function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText === '') {
        alert('Task cannot be empty!');
        return;
    }
    const newTask = { text: taskText, completed: false };
    tasks.push(newTask);
    newTaskInput.value = '';
    saveAndRender();
}

function renderTasks() {
    taskList.innerHTML = ''; // Clear existing tasks
    const filter = filterSelect.value;
    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.draggable = true;
        li.dataset.index = index;

        const text = document.createElement('span');
        text.textContent = task.text;
        text.addEventListener('click', () => toggleTask(index));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(index));

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editTask(index));

        li.appendChild(text);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        li.addEventListener('dragstart', handleDragStart);
        li.addEventListener('dragover', handleDragOver);
        li.addEventListener('drop', handleDrop);
        li.addEventListener('dragend', handleDragEnd);

        taskList.appendChild(li);
    });
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function saveAndRender() {
    saveTasks();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveAndRender();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveAndRender();
}

function editTask(index) {
    const newTaskText = prompt('Edit your task:', tasks[index].text);
    if (newTaskText !== null && newTaskText.trim() !== '') {
        tasks[index].text = newTaskText.trim();
        saveAndRender();
    } else if (newTaskText !== null) {
        alert('Task cannot be empty!');
    }
}

let draggedIndex = null;

function handleDragStart(e) {
    draggedIndex = e.target.dataset.index;
    e.target.classList.add('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    const draggingElement = document.querySelector('.dragging');
    const afterElement = getDragAfterElement(e.clientY);
    if (afterElement) {
        taskList.insertBefore(draggingElement, afterElement);
    } else {
        taskList.appendChild(draggingElement);
    }
}

function handleDrop(e) {
    e.preventDefault();
    const targetIndex = Array.from(taskList.children).indexOf(e.target);
    if (targetIndex >= 0) {
        const [draggedTask] = tasks.splice(draggedIndex, 1);
        tasks.splice(targetIndex, 0, draggedTask);
        saveAndRender();
    }
}

function handleDragEnd() {
    const draggingElement = document.querySelector('.dragging');
    if (draggingElement) {
        draggingElement.classList.remove('dragging');
    }
    draggedIndex = null;
}

function getDragAfterElement(y) {
    const elements = [...taskList.querySelectorAll('li:not(.dragging)')];
    return elements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

renderTasks();

document.addEventListener('DOMContentLoaded', function () {
  localStorageLoad();
});

function localStorageLoad() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskList = document.getElementById('taskList');

  taskList.innerHTML = '';

  savedTasks.forEach(function (task, index) {
    const taskElement = createTask(task, index);
    taskList.appendChild(taskElement);
  });
}

function createTask(task, index) {
  const taskElement = document.createElement('div');
  taskElement.classList.add('task', 'fade-in');

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'delete-btn');
  deleteButton.setAttribute('data-index', index); 
  deleteButton.innerText = 'x';
  deleteButton.style.display = 'none'; 

  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('content-wrapper');
  contentWrapper.innerHTML = `
    <p><strong>${task.addTask}</strong></p> <br>
    <h6>${task.date}</h6>
    <h6>${task.time}</h6>
  `;

  taskElement.appendChild(deleteButton);
  taskElement.appendChild(contentWrapper);

  deleteButton.addEventListener('click', function () {
    const taskIndex = parseInt(deleteButton.getAttribute('data-index'));
    deleteTask(taskIndex);
  });

  taskElement.addEventListener('mouseover', function () {
    deleteButton.style.display = 'block';
  });

  taskElement.addEventListener('mouseout', function () {
    deleteButton.style.display = 'none';
  });

  setTimeout(function () {
    taskElement.classList.remove('fade-in');
  }, 500);

  return taskElement;
}

function addTask() {
  const addTask = document.getElementById('taskInput').value;
  const date = document.getElementById('taskDate').value;
  const time = document.getElementById('taskTime').value;

  if (addTask && date && time) {
      const task = { addTask, date, time };
      const taskList = document.getElementById('taskList');
      const taskElement = createTask(task, taskList.childElementCount);
      taskList.appendChild(taskElement);

      localStorageSave(task);
      clearForm();
  } else {
      alert('Please fill all required fields');
  } 
}

function localStorageSave(task) {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(savedTasks));
}

function deleteTask(index) {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(savedTasks));
  localStorageLoad();
}

function clearForm() {
  document.getElementById('taskInput').value = '';
  document.getElementById('taskDate').value = '';
  document.getElementById('taskTime').value = '';
}

document.getElementById('addTask').addEventListener('click', addTask);

document.getElementById('clearForm').addEventListener('click', clearForm);

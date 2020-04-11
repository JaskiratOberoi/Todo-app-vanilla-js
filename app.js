//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getAllTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions
function addTodo(event) {
  //Prevent form from submitting
  event.preventDefault();

  //   Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //   Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //ADD todo to local storage
  saveLocalTodos(todoInput.value);

  //CHECK MARK BUTTON
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class = "fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //DELETE BUTTON
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class = "fas fa-trash"></i>';
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);

  //APPEND TO LIST
  todoList.appendChild(todoDiv);

  //Clear Todo input value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  //DELETE TODO

  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");
    if (todo.classList.contains("completed")) {
      removeCompletedLocalStorage(todo.innerText);
    } else {
      removeLocalTodos(todo.innerText);
    }
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //CHECK MARK

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    if (todo.classList.contains("completed")) {
      markCompletedLocalStorage(todo.innerText);
    } else {
      toggleCompletedLocalTodos(todo.innerText);
    }
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // CHECK FOR AN EXISTING STORAGE
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    //   Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //   Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //DELETE BUTTON
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class = "fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    //APPEND TO LIST
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = Array.from(todoList.childNodes).indexOf(todo);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function markCompletedLocalStorage(todo) {
  let completedTodos, todos;
  if (localStorage.getItem("completedTodos") === null) {
    completedTodos = [];
  } else {
    completedTodos = JSON.parse(localStorage.getItem("completedTodos"));
  }

  todos = JSON.parse(localStorage.getItem("todos"));

  completedTodos.push(todo);
  localStorage.setItem("completedTodos", JSON.stringify(completedTodos));

  const todoIndex = Array.from(todoList.childNodes).indexOf(todo);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getCompletedTodos() {
  let completedTodos;
  if (localStorage.getItem("completedTodos") === null) {
    completedTodos = [];
  } else {
    completedTodos = JSON.parse(localStorage.getItem("completedTodos"));
  }

  completedTodos.forEach(function (todo) {
    //   Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.classList.add("completed");

    //   Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //DELETE BUTTON
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class = "fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    //APPEND TO LIST
    todoList.appendChild(todoDiv);
  });
}

function toggleCompletedLocalTodos(todo) {
  let completedTodos, todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  completedTodos = JSON.parse(localStorage.getItem("completedTodos"));

  todos.push(todo);
  const todoIndex = Array.from(todoList.childNodes).indexOf(todo);
  completedTodos.splice(todoIndex, 1);
  localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeCompletedLocalTodos(todo) {
  let completedTodos = JSON.parse(localStorage.getItem("completedTodos"));

  const todoIndex = Array.from(todoList.childNodes).indexOf(todo);
  completedTodos.splice(todoIndex, 1);
  localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
}

function getAllTodos() {
  getTodos();
  getCompletedTodos();
}

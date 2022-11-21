const addTodo = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");

const generateTodo = (todo) => {
  const todoList = `
<li class="list-group-item d-flex justify-content-between align-items-center">
     <span>${todo}</span>
     <i class="far fa-trash-alt delete"></i>
</li>
`;

  list.innerHTML += todoList;
};

// Add ToDo
const addTodoFn = () => {
  addTodo.addEventListener("submit", (e) => {
    e.preventDefault();

    const todo = addTodo.add.value.trim();

    if (todo.length) {
      generateTodo(todo);
      saveLocalTodos(todo);
      addTodo.reset();
    }
  });
};
addTodoFn();

// Delete ToDo
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    let todo = e.target.parentElement;
    todo.remove();
    removeLocal(todo);
  }
});

// Filter ToDos
const filterTodos = (term) => {
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add("filtered"));

  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove("filtered"));
};

// Keyup event
search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});

//Save Local
const saveLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Get Local
const getTodos = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    generateTodo(todo);
  });
};

// Delete Local
const removeLocal = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
};
document.addEventListener("DOMContentLoaded", getTodos);

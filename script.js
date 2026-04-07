const STORAGE_KEY = "daily_todo_items_v1";

const form = document.getElementById("todo-form");
const titleInput = document.getElementById("title");
const dateInput = document.getElementById("date");
const detailsInput = document.getElementById("details");
const filterDateInput = document.getElementById("filter-date");
const todoList = document.getElementById("todo-list");
const template = document.getElementById("todo-item-template");

/** @type {{id: string, title: string, date: string, details: string, done: boolean}[]} */
let todos = loadTodos();

dateInput.valueAsDate = new Date();
renderTodos();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = titleInput.value.trim();
  const date = dateInput.value;
  const details = detailsInput.value.trim();

  if (!title || !date) {
    return;
  }

  const newTodo = {
    id: crypto.randomUUID(),
    title,
    date,
    details,
    done: false,
  };

  todos.unshift(newTodo);
  persistTodos();
  form.reset();
  dateInput.valueAsDate = new Date();
  renderTodos();
});

filterDateInput.addEventListener("input", renderTodos);

function renderTodos() {
  const selectedDate = filterDateInput.value;
  const visibleTodos = selectedDate
    ? todos.filter((todo) => todo.date === selectedDate)
    : todos;

  todoList.innerHTML = "";

  if (!visibleTodos.length) {
    const emptyState = document.createElement("li");
    emptyState.className = "empty";
    emptyState.textContent = selectedDate
      ? "Is date ke liye koi task nahi mila."
      : "Abhi tak koi task add nahi hua.";
    todoList.appendChild(emptyState);
    return;
  }

  visibleTodos.forEach((todo) => {
    const item = template.content.firstElementChild.cloneNode(true);

    item.dataset.todoId = todo.id;
    item.classList.toggle("done", todo.done);

    item.querySelector(".todo-title").textContent = todo.title;
    item.querySelector(".todo-date").textContent = formatDate(todo.date);
    item.querySelector(".todo-details").textContent = todo.details || "No details";

    const doneBtn = item.querySelector(".mark-done");
    doneBtn.textContent = todo.done ? "Undo" : "Done";
    doneBtn.addEventListener("click", () => toggleDone(todo.id));

    item.querySelector(".delete").addEventListener("click", () => deleteTodo(todo.id));

    todoList.appendChild(item);
  });
}

function toggleDone(todoId) {
  todos = todos.map((todo) =>
    todo.id === todoId ? { ...todo, done: !todo.done } : todo,
  );
  persistTodos();
  renderTodos();
}

function deleteTodo(todoId) {
  todos = todos.filter((todo) => todo.id !== todoId);
  persistTodos();
  renderTodos();
}

function loadTodos() {
  const value = localStorage.getItem(STORAGE_KEY);

  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function formatDate(dateText) {
  const date = new Date(`${dateText}T00:00:00`);
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

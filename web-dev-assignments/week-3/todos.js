function addTodo() {
  const inputDiv = document.getElementById("todo-input");
  const todo = inputDiv.value;
  const todoList = document.getElementsByClassName("todo-list")[0];
  if (todo === "") {
    alert("Please enter a todo item");
    return;
  }
  let todos = [];
  if (todoList.childElementCount == 0) {
    const index = 1;

    const todoItemDiv = getTodoItem(todo, index);
    todoList.appendChild(todoItemDiv);
  } else {
    const index = todoList.childElementCount + 1;
    const todoItemDiv = getTodoItem(todo, index);
    todoList.appendChild(todoItemDiv);
  }

  inputDiv.value = "";
}

function getTodoItem(value, index) {
  const todoItemDiv = document.createElement("div");
 
  todoItemDiv.className = "todo-item-" + index;
  todoItemText = document.createElement("h4");
  todoItemText.id = "todo-item-text-" + index;
  todoItemText.innerText = index + ". " + value;
  todoItemDiv.appendChild(todoItemText);

  const updateButton = document.createElement("button");
  updateButton.className = "update-button-" + index;
  updateButton.innerText = "Update";
  updateButton.onclick = () => updateTodo(index);
  todoItemDiv.appendChild(updateButton);

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button-" + index;
  deleteButton.innerText = "Delete";
  deleteButton.onclick = () => deleteTodo(index);
  todoItemDiv.appendChild(deleteButton);

  return todoItemDiv;
}

function deleteTodo(index) {
  const element = document.getElementsByClassName("todo-item-" + index);
  element[0].parentElement.removeChild(element[0]);
  document.getElementById("todo-input").value = "";
}

function updateTodo(index) {
  const element = document.getElementById("todo-item-text-" + index);

  document.getElementById("todo-input").value =
    element.innerText.split(". ")[1];
  document.getElementById("add-button").style.display = "none";
  document.getElementById("update-button").style.display = "block";
  document.getElementById("update-button").onclick = () =>
    updateTodoListActual(index);
}

function updateTodoList() {
  console.log("Update button clicked");
}

function updateTodoListActual(index) {
  const element = document.getElementById("todo-item-text-" + index);
  element.innerText =
    index + ". " + document.getElementById("todo-input").value;
  document.getElementById("todo-input").value = "";
  document.getElementById("add-button").style.display = "block";
  document.getElementById("update-button").style.display = "none";
}

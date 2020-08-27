var todoInput = document.querySelector(".todo-input");
var todobtn = document.querySelector(".todo-btn");
var todolist = document.querySelector(".todo-list");
var filteroption = document.querySelector(".filter-todo");
todobtn.addEventListener("click", addinput);
todolist.addEventListener("click", deletecheck);
filteroption.addEventListener("click", filtertodo);
document.addEventListener("DOMContentLoaded", gettodos);
function addinput(event) {
  event.preventDefault();

  var textval = todoInput.value;

  var todo = document.createElement("div");
  todo.classList.add("todos");
  var newtodo = document.createElement("li");
  newtodo.classList.add("todo-li");
  newtodo.innerText = textval;
  localtodos(textval);
  console.log(newtodo.innerText);
  todo.appendChild(newtodo);

  const completedbtn = document.createElement("button");
  completedbtn.innerHTML = '<i class="fas fa-check-square"></i>';
  completedbtn.classList.add("com-btn");
  todo.appendChild(completedbtn);

  const trashbtn = document.createElement("button");
  trashbtn.innerHTML = '<i class="fas fa-trash"><i>';
  trashbtn.classList.add("trash-btn");
  todo.appendChild(trashbtn);

  todolist.appendChild(todo);
  todoInput.value = "";
}
function deletecheck(e) {
  var item = e.target;
  if (item.classList[0] === "trash-btn") {
    var todof = item.parentElement;
    todof.classList.add("fall");
    removetodo(todof);
    todof.addEventListener("transitionend", function () {
      todof.remove();
    });
    //todof.remove();
  }
  if (item.classList[0] === "com-btn") {
    var todos = item.parentElement;

    todos.classList.toggle("completed");
  }
}
function filtertodo(e) {
  var todop = todolist.childNodes;
  console.log(todop);
  todop.forEach(function (todos) {
    switch (e.target.value) {
      case "all":
        todos.style.display = "flex";
        break;
      case "completed":
        if (todos.classList.contains("completed")) {
          todos.style.display = "flex";
        } else {
          todos.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todos.classList.contains("completed")) {
          todos.style.display = "flex";
        } else {
          todos.style.display = "none";
        }
        break;
    }
  });
}
function localtodos(todos) {
  let todof;
  if (localStorage.getItem("todof") === null) {
    todof = [];
  } else {
    todof = JSON.parse(localStorage.getItem("todof"));
  }
  todof.push(todos);
  localStorage.setItem("todof", JSON.stringify(todof));
}
function gettodos(todos) {
  let todof;
  if (localStorage.getItem("todof") === null) {
    todof = [];
  } else {
    todof = JSON.parse(localStorage.getItem("todof"));
  }
  todof.forEach(function (todos) {
    var todo = document.createElement("div");
    todo.classList.add("todos");
    var newtodo = document.createElement("li");
    newtodo.classList.add("todo-li");
    newtodo.innerText = todos;
    console.log(newtodo.innerText);
    todo.appendChild(newtodo);

    const completedbtn = document.createElement("button");
    completedbtn.innerHTML = '<i class="fas fa-check-square"></i>';
    completedbtn.classList.add("com-btn");
    todo.appendChild(completedbtn);

    const trashbtn = document.createElement("button");
    trashbtn.innerHTML = '<i class="fas fa-trash"><i>';
    trashbtn.classList.add("trash-btn");
    todo.appendChild(trashbtn);

    todolist.appendChild(todo);
  });
}
function removetodo(todos) {
  let todof;
  if (localStorage.getItem("todof") === null) {
    todof = [];
  } else {
    todof = JSON.parse(localStorage.getItem("todof"));
  }
  console.log(todos);
  var todoIndex = todos.children[0].innerText;
  console.log(todoIndex);
  todof.splice(todof.indexOf(todoIndex), 1);
  localStorage.setItem("todof", JSON.stringify(todof));
}

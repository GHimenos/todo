const task = document.querySelector("#js_taskContent");
task.addEventListener("submit", createTodo);
const printItems = document.querySelector(".js_printItems");
const delAll = document.querySelector(".js_reset");
delAll.addEventListener("click", delAllTodos);

let todosArr = [];
let newAdded = false;

renderTodos();

function renderTodos() {
  printItems.innerHTML = "";
  if (newAdded) {
    storageReset();
    readTodos(todosArr);
  } else {
    let newArr = JSON.parse(localStorage.getItem("todos"));
    !newArr ? (todosArr = []) : (todosArr = newArr);
    readTodos(todosArr);
  }

  let tasks = document.querySelectorAll(".js_taskCard");
  let doneMarker = document.querySelectorAll(".js_doneTodo");

  if (tasks.length !== 0) {
    tasks.forEach((item) => {
      item.addEventListener("submit", deleteTodo);
    });

    doneMarker.forEach((item) => {
      item.addEventListener("change", markDone);
    });
  }
}

function createTodo(event) {
  event.preventDefault();
  let input = new FormData(this);
  let output = Object.fromEntries(input);
  output.checked = "";
  todosArr.push(output);
  newAdded = true;
  renderTodos();
  task.reset();
}

function readTodos(arr) {
  arr.forEach((item) => {
    printItems.insertAdjacentHTML(
      "afterbegin",
      `
      <div class = "col-4">
        <form action="#" class = "b-taskCard js_taskCard">
          <p class="fs-5 b-taskCard__title">${item.title}</p> 
          <p>${item.description}</p><hr> 
          <input name = "doneStatus" class = "js_doneTodo" type="checkbox" ${item.checked}> <span>Closed</span> <hr>
          <input class = "btn btn-danger js_delTodo" type="submit" value="Delete">
        </form>
      </div>
      `
    );
  });
}

function updateTodos(){
  let updatedTodos = document.querySelectorAll(".js_taskCard");
  todosArr = [];
  updatedTodos.forEach((item) => {
    let checkStatus = false;
    if (item.children[3].checked === true) {
      checkStatus = "checked";
    }

    todosArr.push({
      title: `${item.children[0].innerText}`,
      description: `${item.children[1].innerText}`,
      checked: `${checkStatus}`
    });
  });
  todosArr.reverse();  
}

function deleteTodo(event) {
  event.preventDefault();
  this.remove();
  updateTodos();
  storageReset();
  renderTodos();
}

function delAllTodos(event) {
  event.preventDefault();
  todosArr = [];
  localStorage.clear();
  renderTodos();
}

function markDone(event) {
  event.preventDefault();
  updateTodos();
  storageReset();
  renderTodos();  
}

function storageReset() {
  localStorage.clear();
  localStorage.setItem("todos", JSON.stringify(todosArr));
  todosArr = JSON.parse(localStorage.getItem("todos"));
}
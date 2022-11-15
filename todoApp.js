//-----------------------------Model-----------------------------//

let savedTodos = JSON.parse(localStorage.getItem("todoItems"));
let totHighPr;
if (Array.isArray(savedTodos)) {
  todos = savedTodos;
} else {
  todos = [];
}
todos[-1] = { todoTitle: "", dueDate: "", memo: "" };

for (
  totHighPr = 0;
  totHighPr < todos.length && todos[totHighPr].priority === true;
  totHighPr++
);
const pushTodo = (todo) => {
  const index = todo.priority ? totHighPr++ : todos.length;
  todos.splice(index, 0, todo);
  saveTodo();
  dispList();
  return index;
};

const removeTask = (val) => {
  todos.splice(val, 1);
  saveTodo();
  dispList();
};

const saveTodo = () => {
  localStorage.setItem("todoItems", JSON.stringify(todos));
};

//-----------------------------View-----------------------------//

const togglePage = () => {
  let left = document.querySelector(".left-sec");
  let mid = document.querySelector(".mid-sec");
  let right = document.querySelector(".right-sec");

  if (toggle.dataset.isToggled === "false") {
    toggle.innerHTML = "	&#x2771;  &nbsp; &#x2770;";
    toggle.dataset.isToggled = "true";

    left.style.translate = "-310px";
    mid.style.transform = "scale(1.07)";
    right.style.translate = "310px";
  } else {
    toggle.innerHTML = "	&#x2770;  &nbsp; &#x2771;";
    toggle.dataset.isToggled = "false";

    left.style.translate = "0";
    mid.style.transform = "scale(1.01)";
    right.style.translate = "0";
  }
};

const dispList = () => {
  document.querySelector("#todoList").innerHTML = "";
  todos.forEach((element) => {
    const node = document.createElement("li");
    node.innerText = element.todoTitle;

    if (element.priority) node.style.fontWeight = 500;
    node.dataset.index = todos.indexOf(element);
    node.addEventListener("click", refreshRight);

    document.querySelector("#todoList").appendChild(node);
  });
};

const dispTodo = (val) => {
  document.querySelector("#title").innerText = todos[val].todoTitle;
  document.querySelector("#date").innerText = todos[val].dueDate;
  document.querySelector("#memo").innerText = todos[val].memo;

  let emptyPage = document.querySelector("#emptyPage");
  emptyPage.innerText = "";

  let remButton = document.querySelector(".rem");
  remButton.id = val;
  remButton.style.display = "block";
  document.querySelector("#memo").style.opacity = 1;

  if (val == -1) {
    if (todos.length === 0) {
      emptyPage.innerHTML = "To Do List <br/> Empty..<br/>Add some!!";
    } else {
      emptyPage.innerHTML = "None <br/> selected <br/> to Dispaly!";
    }
    remButton.style.display = "none";
    document.querySelector("#memo").style.opacity = 0;
  }
};

//-----------------------------Control-----------------------------//

let toggle = document.querySelector("#pageToggle");
toggle.addEventListener("click", togglePage);

const addTodo = () => {
  const todoText = document.querySelector("#textBox");
  const todoDate = document.querySelector("#dateBox");
  const todoMemo = document.querySelector("#memoBox");
  const todoPr = document.getElementById("highPriority").checked;
  let errorMssg = document.querySelector("#error");

  if (todoText.value === "") {
    errorMssg.innerText = "Enter To Do name";
    return;
  }
  errorMssg.innerText = "";
  const todo = {
    todoTitle: todoText.value,
    dueDate: todoDate.value,
    memo: todoMemo.value,
    priority: todoPr,
  };

  let index = pushTodo(todo);
  dispTodo(index);

  todoText.value = "";
  todoDate.value = "";
  todoMemo.value = "";
};

const refreshRight = (e) => {
  const val = e.target.dataset.index;
  if (toggle.dataset.isToggled === "false") togglePage();
  dispTodo(val);
};

const removeTodo = (e) => {
  const val = e.target.id;
  if (todos[val].priority) totHighPr--;
  removeTask(val);
  dispTodo(-1);
};

dispList();
const init = todos.length > 0 ? 0 : -1;
dispTodo(init);

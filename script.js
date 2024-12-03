"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");
const submitBtn = document.querySelector(".submit");
const todoList = document.querySelector(".todo-list");
const scoreDisplay = document.querySelector(".score");
const highscoreDisplay = document.querySelector(".highscore");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

const updateCounts = function () {
  const todos = todoList.querySelectorAll(".todo-item");
  const completedCheckboxes = todoList.querySelectorAll(
    ".todo-item input[type='checkbox']:checked"
  );

  scoreDisplay.textContent = todos.length;
  highscoreDisplay.textContent = completedCheckboxes.length;
};

const createTodoItem = function (title, desc, date) {
  const todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.addEventListener("change", updateCounts);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = `
  <?xml version="1.0"?><svg fill="#FA5252" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="60px" height="60px">    <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"/></svg>
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6L17 20H7L5 6"></path>
      <line x1="9" y1="10" x2="9" y2="16"></line>
      <line x1="15" y1="10" x2="15" y2="16"></line>
    </svg>`;
  deleteBtn.classList.add("btn-delete");
  deleteBtn.addEventListener("click", function () {
    todoItem.remove();
    updateCounts();
  });

  todoItem.innerHTML = `
    <h2>${title}</h2>
    <h3>${desc}</h3>
    <h4>${date}</h4>
  `;

  todoItem.appendChild(checkbox);
  todoItem.appendChild(deleteBtn);
  todoList.appendChild(todoItem);

  updateCounts();
};

window.addEventListener("load", () => {
  createTodoItem("Buy Groceries", "Milk, Bread, Eggs", "2024-12-05");
  createTodoItem("Workout", "Leg day at the gym", "2024-12-06");
});

submitBtn.addEventListener("click", function () {
  const title = document.querySelector(".title").value;
  const desc = document.querySelector(".desc").value;
  const date = document.querySelector(".date").value;

  if (title && desc && date) {
    createTodoItem(title, desc, date);

    document.querySelector(".title").value = "";
    document.querySelector(".desc").value = "";
    document.querySelector(".date").value = "";

    closeModal();
  }
});

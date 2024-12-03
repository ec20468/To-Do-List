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

  todoItem.innerHTML = `
    <h2>${title}</h2>
    <h3>${desc}</h3>
    <h4>${date}</h4>
  `;

  todoItem.appendChild(checkbox);
  todoList.appendChild(todoItem);

  updateCounts();
};

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

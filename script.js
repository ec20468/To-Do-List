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
  //open modal
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  //close modal
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (
  let i = 0;
  i < btnsOpenModal.length;
  i++ //listen for event that openmodal button is clicked
)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal); //listen to the event that closes modal
overlay.addEventListener("click", closeModal);

// Function to update the counts
const updateCounts = function () {
  const todos = todoList.querySelectorAll(".todo-item"); //counts all items in the t do
  const completedCheckboxes = todoList.querySelectorAll(
    ".todo-item input[type='checkbox']:checked" //if ro do item is checked, then it will add the completed count
  );

  // Update the counts displayed on the page
  scoreDisplay.textContent = todos.length; //bit of DOM magic to update the display without refreshing page
  highscoreDisplay.textContent = completedCheckboxes.length;
};

// Function to create a new to-do item
const createTodoItem = function (title, desc, date) {
  const todoItem = document.createElement("div"); //another bit of DOM magic to
  todoItem.classList.add("todo-item");

  // Create the checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.addEventListener("change", updateCounts); // Update counts when checkbox state changes

  // Create the content for the todo item
  todoItem.innerHTML = `
    <h2>${title}</h2>
    <h3>${desc}</h3>
    <h4>${date}</h4>
  `;

  // Append the checkbox to the todo item and position it to the right
  todoItem.appendChild(checkbox);
  todoList.appendChild(todoItem);

  // Update counts whenever a new todo item is created
  updateCounts();
};

// Event listener for the submit button
submitBtn.addEventListener("click", function () {
  const title = document.querySelector(".title").value;
  const desc = document.querySelector(".desc").value;
  const date = document.querySelector(".date").value;

  if (title && desc && date) {
    createTodoItem(title, desc, date);

    // Clear the input fields after submission
    document.querySelector(".title").value = "";
    document.querySelector(".desc").value = "";
    document.querySelector(".date").value = "";

    closeModal();
  }
});

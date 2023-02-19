import { Navbar } from "../Components/Navbar/Navbar.js";
// import { showReportCard } from "./report.js";
let token = JSON.parse(localStorage.getItem("user-token")) || {};
var val = token ? "Logout" : "Login";

document.getElementById("header").innerHTML = await Navbar(val);

const navbarToggle = document.querySelector(".navbar-toggle");
const navMenu = document.querySelector(".drawer-menu");

navbarToggle.addEventListener("click", function () {
  navMenu.classList.toggle("show");
});

let currentIndex = 0;
let questionsArray;
function displayQuestion(question) {
  document.getElementById("quiz-area").innerHTML = "";
  console.log(question, "quiz-area");
  const popup = document.createElement("form");
  popup.classList.add("popup");
  const questionElement = document.createElement("h2");
  questionElement.textContent = question.question;
  popup.appendChild(questionElement);

  //creating the different radio options
  const optionsList = document.createElement("ul");
  question.options.forEach((option) => {
    const optionElement = document.createElement("li");
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.value = option;
    label.appendChild(radio);
    label.appendChild(document.createTextNode(option));
    optionElement.appendChild(label);
    optionsList.appendChild(optionElement);
  });

  popup.appendChild(optionsList);

  //creating submit button
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Submit";
  submitButton.addEventListener("submit", handleFormSubmit);

  //creating skip button
  const skipButton = document.createElement("button");
  // skipButton.type = "submit";
  skipButton.textContent = "Skip";
  skipButton.addEventListener("click", handleSkip);
  const buttonList = document.createElement("div");
  buttonList.classList.add("button-list");

  buttonList.appendChild(submitButton);
  buttonList.appendChild(skipButton);
  popup.appendChild(buttonList);
  document.getElementById("quiz-area").appendChild(popup);
}

function storeAnswer(index, answer) {
  const storedAnswers = JSON.parse(localStorage.getItem("answers")) || {};
  storedAnswers[index] = answer;
  localStorage.setItem("answers", JSON.stringify(storedAnswers));
}

// function calculateScore(questions) {
//   let score = 0;
//   const storedAnswers = JSON.parse(localStorage.getItem("answers"));
//   questions.forEach((question, index) => {
//     const correctAnswer = question.answer;
//     const userAnswer = storedAnswers[index];
//     if (userAnswer === correctAnswer) {
//       score++;
//     }
//   });
//   return score;
// }

const runQuiz = async () => {
  try {
    let response = await fetch("./questions.json");
    let questions = await response.json(); //returning a object of Array
    questionsArray = questions.questions;

    console.log(questionsArray);

    showQuestion();
    document.addEventListener("submit", handleFormSubmit);
  } catch (error) {
    console.log(error);
  }
};

function showQuestion() {
  console.log("current index: " + currentIndex);
  console.log("questions.length" + questionsArray.length);
  if (currentIndex >= questionsArray.length) {
    // showReportCard(questionsArray);
    localStorage.setItem("answers-Array", JSON.stringify(questionsArray));
    window.location.href = "../report.html";
  } else {
    displayQuestion(questionsArray[currentIndex]);
  }
}

const handleFormSubmit = (event) => {
  event.preventDefault();
  console.log(event.target);
  const answer = new FormData(event.target).get("answer");
  console.log(answer, "answer");
  if (answer) {
    storeAnswer(currentIndex, answer);
    currentIndex++;
    showQuestion();
  } else {
    return;
  }
};
const handleSkip = () => {
  currentIndex += 1;
  if (currentIndex >= questionsArray.length) {
    // showReportCard(questionsArray);
    localStorage.setItem("answers-Array", JSON.stringify(questionsArray));
    window.location.href = "../report.html";
  } else {
    storeAnswer(currentIndex - 1, "");
    displayQuestion(questionsArray[currentIndex]);
  }
};

runQuiz();

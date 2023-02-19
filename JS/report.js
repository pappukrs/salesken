import { Navbar } from "../Components/Navbar/Navbar.js";

let token = JSON.parse(localStorage.getItem("user-token")) || {};
var val = token ? "Logout" : "Login";

document.getElementById("header").innerHTML = await Navbar(val);

const navbarToggle = document.querySelector(".navbar-toggle");
const navMenu = document.querySelector(".drawer-menu");

navbarToggle.addEventListener("click", function () {
  navMenu.classList.toggle("show");
});

let questionsArray = JSON.parse(localStorage.getItem("answers-Array")) || [];
console.log(questionsArray, "questionArray");
function showReportCard(questions) {
  document.getElementById("report-area").innerHTML = "";
  if (questions.length == 0) {
    let div = document.createElement("div");
    let h1 = document.createElement("h1");
    let h2 = document.createElement("h2");
    h1.textContent = "You have not given any quiz. !  ";
    h2.textContent = "Please attempt quiz!!";
    div.style.textAlign = "center";
    div.style.marginTop = "100px";
    div.appendChild(h1);
    div.appendChild(h2);
    document.getElementById("report-area").appendChild(div);
    return;
  }
  const reportCardElement = document.createElement("div");
  reportCardElement.classList.add("report-card");
  const score = calculateScore(questions);
  const headingElement = document.createElement("h2");
  headingElement.textContent = `Your score: ${score} / ${questions.length}`;
  reportCardElement.appendChild(headingElement);
  questions.forEach((question, index) => {
    const result = {
      question: question.question,
      answer: JSON.parse(localStorage.getItem("answers"))[index],
      isCorrect:
        JSON.parse(localStorage.getItem("answers"))[index] === question.answer,
    };
    const resultElement = document.createElement("div");
    resultElement.classList.add("result");
    resultElement.classList.add(result.isCorrect ? "correct" : "incorrect");
    const questionElement = document.createElement("p");
    questionElement.textContent = result.question;
    resultElement.appendChild(questionElement);
    const answerElement = document.createElement("p");
    let ans = result.answer ? result.answer : "Skipped";
    answerElement.textContent = `Your answer: ${ans}`;
    resultElement.appendChild(answerElement);
    const isCorrectElement = document.createElement("p");
    isCorrectElement.textContent = `Correct answer: ${
      result.isCorrect ? result.answer : question.answer
    }`;
    resultElement.appendChild(isCorrectElement);
    reportCardElement.appendChild(resultElement);
  });
  document.getElementById("report-area").appendChild(reportCardElement);
}

function calculateScore(questions) {
  let score = 0;
  const storedAnswers = JSON.parse(localStorage.getItem("answers"));
  questions.forEach((question, index) => {
    const correctAnswer = question.answer;
    const userAnswer = storedAnswers[index];
    if (userAnswer === correctAnswer) {
      score++;
    }
  });
  return score;
}

showReportCard(questionsArray);

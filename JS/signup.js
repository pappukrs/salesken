import { Navbar } from "../Components/Navbar/Navbar.js";

let token = JSON.parse(localStorage.getItem("user-token")) || {};
var val = token ? "Logout" : "Login";

document.getElementById("header").innerHTML = await Navbar(val);

const navbarToggle = document.querySelector(".navbar-toggle");
const navMenu = document.querySelector(".drawer-menu");

navbarToggle.addEventListener("click", function () {
  navMenu.classList.toggle("show");
});

let userDataBase = JSON.parse(localStorage.getItem("user")) || [];

const form = document.getElementById("signup-form");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const userRegex = /^[a-zA-Z0-9._-]{3,16}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{}|;':",./?<>]).{8,}$/;

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const email = form.elements.email.value;
  let username = form.elements.username.value;
  let password = form.elements.password.value;

  console.log(email, username, password);

  if (
    emailRegex.test(email) &&
    userRegex.test(username) &&
    passwordRegex.test(password)
  ) {
    let emailCheck = userDataBase.filter((ele) => ele.email == email);
    if (emailCheck.length > 0) {
      alert("email already exists");
      return;
    }
    let usernameCheck = userDataBase.filter((ele) => ele.username == username);
    if (usernameCheck.length > 0) {
      alert("username already exists");
      return;
    }
    userDataBase.push({ email: email, username: username, password: password });
    localStorage.setItem("user", JSON.stringify(userDataBase));
    window.location.href = "./login.html";
  } else {
    alert("Please enter both username and password");
  }
});

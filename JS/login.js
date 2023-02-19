import { Navbar } from "../Components/Navbar/Navbar.js";

let token = JSON.parse(localStorage.getItem("user-token")) || {};
var val = token ? "Logout" : "Login";

document.getElementById("header").innerHTML = await Navbar(val);

const navbarToggle = document.querySelector(".navbar-toggle");
const navMenu = document.querySelector(".drawer-menu");

navbarToggle.addEventListener("click", function () {
  navMenu.classList.toggle("show");
});
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const userRegex = /^[a-zA-Z0-9._-]{3,16}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{}|;':",./?<>]).{8,}$/;
let userDataBase = JSON.parse(localStorage.getItem("user")) || [];
const form = document.getElementById("login-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = form.elements.username.value;
  const password = form.elements.password.value;
  console.log(username, password);

  if (userRegex.test(username) && passwordRegex.test(password)) {
    // let emailCheck = userDataBase.filter((ele) => ele.email == email);
    // if (emailCheck.length > 0) {
    //   alert("email doestnot exist. please register first");
    //   return;
    // }
    let usernameCheck = userDataBase.filter((ele) => ele.username == username);
    console.log(usernameCheck, "usernamecheck");
    if (usernameCheck.length == 0) {
      alert("username doestnot exists.please register first");
      return;
    }
    let passwordCheck = userDataBase.filter((ele) => ele.username == username);
    console.log(passwordCheck, "password");
    if (passwordCheck.length == 0) {
      alert("Incorrect password");
      return;
    }

    let userFound = userDataBase.filter((ele) => {
      return ele.username == username && ele.password == password;
    });
    console.log(userFound, "userFound");
    if (userFound.length > 0) {
      const Token = `${username}${password}`;
      localStorage.setItem("user-token", JSON.stringify(Token));
      window.location.href = "./quiz.html";
    }
  } else {
    alert("Please enter both username and password");
  }
});

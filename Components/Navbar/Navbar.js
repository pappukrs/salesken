async function Navbar() {
  return `
  <nav class="navbar">
  <div class="navbar-logo">
    <a href="#"><img src="https://img.icons8.com/external-sbts2018-outline-color-sbts2018/58/null/external-quiz-basic-ui-elements-2.3-sbts2018-outline-color-sbts2018.png"/></a>
  </div>
  <div class="navbar-menu">
    <ul>
      <li><a href="../../login.html">Login/Logout</a></li>
      <li><a href="../../quiz.html">Quiz</a></li>
      <li><a href="../../report.html"> Report</a></li>
    </ul>
  </div>
  <div class="navbar-toggle">
  <i class="fi fi-br-menu-burger"></i>
    // <span></span>
    // <span></span>
    // <span></span>
  </div>
</nav>

<div class="drawer-menu">
  <ul>
    <li><a href="#">Login/Logout</a></li>
    <li><a href="#">Quiz</a></li>
    <li><a href="#">Report</a></li>
  </ul>
</div>
    `;
}

export { Navbar };

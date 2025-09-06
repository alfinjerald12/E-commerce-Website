function openPopup() {
  document.getElementById("loginPopup").style.display = "block";
}
function closePopup() {
  document.getElementById("loginPopup").style.display = "none";
}
function openTab(evt, formId) {
  let forms = document.getElementsByClassName("form");
  let tabs = document.getElementsByClassName("tablink");
  
  for (let f of forms) { f.classList.remove("active"); }
  for (let t of tabs) { t.classList.remove("active"); }
  
  document.getElementById(formId).classList.add("active");
  evt.currentTarget.classList.add("active");
}

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let formData = new FormData(this);

  fetch("login.php", { method: "POST", body: formData })
    .then(res => res.json())
    .then(data => {
      if (data.status === "success") {
        localStorage.setItem("user", data.user); // Save username
        closePopup();
        showWelcome();
      } else {
        alert(data.message);
      }
    });
});

document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let formData = new FormData(this);

  fetch("register.php", { method: "POST", body: formData })
    .then(res => res.json())
    .then(data => {
      if (data.status === "success") {
        localStorage.setItem("user", data.user); // Save username
        closePopup();
        showWelcome();
      } else {
        alert(data.message);
      }
    });
});

// Show welcome message if user already logged in
function showWelcome() {
  let user = localStorage.getItem("user");
  if (user) {
    document.getElementById("welcomeUser").innerHTML = "Welcome, " + user + " 🎉 | <a href='#' onclick='logout()'>Logout</a>";
  }
}

// Logout function
function logout() {
  localStorage.removeItem("user");
  document.getElementById("welcomeUser").innerHTML = "";
}

// Run on page load
window.onload = showWelcome;



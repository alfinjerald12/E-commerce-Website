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

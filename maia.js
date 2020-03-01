
console.log("---hello")
function onMouseOut(event) {
  // Remove this event listener
  document.removeEventListener("mouseout", onMouseOut);

  // Show the popup

  // if(isCandidateNew()){
    var modalElement = document.createElement('DIV');
    modalElement.innerHTML = createModalElem();
    document.body.appendChild(modalElement);
  // }
}

document.addEventListener("mouseout", onMouseOut);

//Setting candidt
function setCandidateEmail(email) {
  var localStorage = window.localStorage;
  localStorage.setItem(email, email)
}

function isCandidateNew() {
  var localStorage = window.localStorage,
    result = localStorage.getItem("email")
  if(result !== null){
    return false;
  }
  return true;
}

//submit button handler
function submitClickHandler(){
  var localStorage = window.localStorage,
  val = document.getElementById("email").value;
  localStorage.setItem("email", val)
  addUserToDataBase()
  document.getElementById("popup").style.display = "none";
}

function addUserToDataBase(){
  document.getElementById("popup").style.display = "none";

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    console.log("----xhr", xhr.responseText)
  }
  xhr.open('POST', "localhost:3000/api/v1/users");
  xhr.send("orem=ispum");

}

function createModalElem(){
  return '<div id="popup" class="popup__wrapper">' +
  '<div class="popup__container">' +
  '<h1 class="popup__title">Thank you for visiting Please enter your email below!</h1>' +
  '<input id="email" class="popup__input" type="text" name="email" />' +
  '<button class="popup__button" onclick="submitClickHandler()" >Submit</button>'+
  '</div>' +
  '</div>'
}
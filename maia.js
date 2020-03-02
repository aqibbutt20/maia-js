
function onMouseOut(event) {
  // Remove this event listener
  document.removeEventListener("mouseout", onMouseOut);

  // Show the popup

  if(isCandidateNew()){
    var modalElement = document.createElement('DIV');
    modalElement.innerHTML = createModalElem();
    document.body.appendChild(modalElement);
  }
}

document.addEventListener("mouseout", onMouseOut);

//Setting candidt
function setCandidateEmail(email) {
  var localStorage = window.localStorage;
  localStorage.setItem("email", email)
}

//checks if candidate is new
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
  addUserToDataBase()
}

//add users to database
function addUserToDataBase(){
  var email = document.getElementById("email").value;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if(xhr.status === 200){
      setCandidateEmail(email)
      document.getElementById("popup").style.display = "none";
    }
  }
  xhr.open('POST', "http://localhost:3000/api/v1/users" );
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(`domain=${window.location.host}&email=${email}`);
}

//returns candidate modal
function createModalElem(){
  return '<div id="popup" class="popup__wrapper">' +
  '<div class="popup__container">' +
  '<h1 class="popup__title">Thank you for visiting Please enter your email below!</h1>' +
  '<input id="email" class="popup__input" type="text" name="email" />' +
  '<button class="popup__button" onclick="submitClickHandler()" >Submit</button>'+
  '</div>' +
  '</div>'
}
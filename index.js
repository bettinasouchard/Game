/*--------------------------------------------------------------------------------*/

/*Quand go, lance le jeu */
let go = document.getElementById("gogo");
go.addEventListener("click", launchgame);

function launchgame() {
  randomvariable();
}

/*--------------------------------------------------------------------------------*/

/* 1. Ordi sors un nombre au hasard entre x et x*/
function nombreHasard(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

/*--------------------------------------------------------------------------------*/

let array = [];
let visibleArray = document.getElementById("array");

/* 2. Prends nombre au hasard, et stock dans une array */
function randomvariable() {
  let randomNum = nombreHasard(1, 11);

  if (array.length <= 10) {
    if (!array.includes(randomNum)) {
      array.push(randomNum);
    } else if (array.includes(randomNum)) {
      return randomvariable();
    }
  }

  document.getElementById("array").innerHTML += "<li>" + randomNum + "</li>";

  document.getElementById("reponse").innerHTML = randomNum;
}

/*--------------------------------------------------------------------------------*/

/* 3. Response disparait après 3secondes */
/*setTimeout(function () {
  let reponse = document.getElementById("reponse");
  reponse.parentNode.removeChild(reponse);
}, 3000); */

/*--------------------------------------------------------------------------------*/

/* 4. Input du joueur */
const input = document.getElementById("input");

const checkKeyCode = (evt) => {
  evt.keyCode === 13 && inputPlayer();
};

function inputPlayer() {
  document.getElementById("array").innerHTML += "<li>" + input.value + "</li>";
  input.value = "";
  randomvariable()
}

input.addEventListener("keydown", checkKeyCode);

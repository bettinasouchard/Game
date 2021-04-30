/*--------------------------------------------------------------------------------*/
/*---------     STORAGE USER / NIVEAUX GAGNES PAS FAITS :(     -------------------*/
/*---------          Do it when lab game is over     -----------------------------*/
/*--------------------------------------------------------------------------------*/

/*--------------------------------------------------------------------------------*/
/*---------------------     CHANGEMENT DE FOND  :(     ---------------------------*/
/*-------------          Do it when lab game is over     -------------------------*/
/*--------------------------------------------------------------------------------*/
/*
 function fond () {
  let fond = document.getElementsById("body");

  if (level = 20) { 
  fond.classList.add("bodyvingt");
  }
 }
*/
/*-------------------------------------------------------------------------------*/

let input = document.getElementById("input"); // input zone
let secondes = document.getElementById("chrono").innerHTML; //30
let whosturn = document.getElementById("whosturn");
let monkey = document.getElementById("monkeyblabla");
let timeoutId;
let array = [];

let level = 0;

/*--------------------------------------------------------------------------------*/
/* . Ordi sors un NOMBRE AU HASARD entre x et x*/

function nombreHasard(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

/*--------------------------------------------------------------------------------*/
/*function qui remet INPUT BLANC*/
const resetUserInput = () => (input.value = "");

/*--------------------------------------------------------------------------------*/
/* . List d'event A FAIRE APRES INPUT JOUEUR*/

function doStuffAfterUserInput() {
  attention.classList.add("hidden");
  whosturn.innerHTML = "Mr Bot's playing ..";
  // 1.input vierge
  resetUserInput();
  // 2.timer remis à zéro
  stopTimer();
  // 3.ordi sors chiffre
  doComputerPickAfterXtime();
  // 4.start timer
  setTimeout(function () {
    whosturn.innerHTML = "It's your turn :";
    startTimer();
  }, 3000);
}

/*--------------------------------------------------------------------------------*/
/* . Ordi sors un CHIFFRE APRES X TEMPS*/

function doComputerPickAfterXtime() {
  monkey.innerHTML = "Mr Bot is thinking ...";
  const timeoutId = setTimeout(function () {
    randomvariable();
    clearTimeout(timeoutId);
  }, 1000);
}

/*--------------------------------------------------------------------------------*/
/* . Si on a appuyé sur ENTREE, renvoi à la liste des choses à faire*/

const checkKeyCode = (evt) => {
  evt.keyCode === 13 && inputPlayer(doStuffAfterUserInput);
};

/*--------------------------------------------------------------------------------*/
/* . Si chiffre player OK > push dans array /SINON gameover+ stop timer*/

function inputPlayer(nextStepsCallback) {
  if (array.length <= level) {
    if (
      isNaN(parseInt(input.value)) ||
      parseInt(input.value) === 0 ||
      parseInt(input.value) > level
    ) {
      warning();
    } else if (!array.includes(parseInt(input.value))) {
      array.push(parseInt(input.value));
      document.getElementById("array").innerHTML +=
        "<li>" + input.value + "</li>";
      nextStepsCallback();
    } else if (array.includes(parseInt(input.value))) {
      stopTimer();
      return gameOver();
    }
  }
}

/* . Quand touche "poussée" verifie que c'est bien entrée*/

input.addEventListener("keydown", checkKeyCode);

/*--------------------------------------------------------------------------------*/
let visibleArray = document.getElementById("array"); //<p ID="ARRAY"> Numbers already given : </p>
let reponse = document.getElementById("reponse"); // <p>Monkey said ...</p> <p ID=REPONSE > X <p/>
visibleArray.style.display = "none";

function randomvariable() {
  let randomNum = nombreHasard(1, level + 1);

  if (array.length <= level) {
    if (!array.includes(randomNum)) {
      array.push(randomNum);
      setTimeout(function () {
        monkey.innerHTML = "Mr Bot is done for now";
        reponse.innerHTML = "";
      }, 2000);
    } else if (array.includes(randomNum)) {
      return randomvariable();
    }

    visibleArray.innerHTML += "<li>" + randomNum + "</li>";
    reponse.innerHTML = randomNum;
  }
  win();
}

/*--------------------------------------------------------------------------------*/
//
function stopTimer() {
  clearTimeout(timeoutId);
  secondes = 60;
  document.getElementById("chrono").innerHTML = secondes;
}

/*--------------------------------------------------------------------------------*/

function startTimer() {
  if (secondes > 0) {
    secondes--;
    document.getElementById("chrono").innerHTML = secondes;
    timeoutId = window.setTimeout(startTimer, 1000);
  } else {
    stopTimer();
    gameOver();
  }
}

/*--------------------------------------------------------------------------------*/
// Retire hidden, montre cadre avec option retry ou quit

let gamedone = document.getElementById("gameover");

function gameOver() {
  stopTimer();
  gamedone.classList.remove("hidden");
  visibleArray.classList.remove("hidden");
}

/*--------------------------------------------------------------------------------*/
// MAGIC *' (pour chaque bouton avec cette cat, onclick, startGame avec l'id en argument 20/30...)

let levelBtns = document.querySelectorAll(".startgame");
levelBtns.forEach((btn) => {
  btn.addEventListener("click", () => startGame(Number(btn.id)));
});

let carddisappear = document.getElementById("yourturn");

function startGame(number) {
  // level déclaré au début et = 0
  level = number;

  let togle = document.getElementById("yourturn");
  togle.style.display = "none";

  let intitu = document.getElementById("intitule");
  intitu.innerHTML += `From 1 to ${level}`;

  input.placeholder = `Between 1 and ${level}`;

  carddisappear.classList.add("hidden");

  startTimer();
}

/*function nextLevel() {
startGame((level + 10));
} */

/*--------------------------------------------------------------------------------*/
// Warning

let attention = document.getElementById("warning");

function warning() {
  resetUserInput();
  attention.classList.remove("hidden");
}

/*--------------------------------------------------------------------------------*/
// Win

let youwon = document.getElementById("win");

function win() {
  if (array.length === level) {
    gamedone.style.display = "none";
    stopTimer();
    setTimeout(function () {
      resetUserInput();
      youwon.classList.remove("hidden");
    }, 1000);
  }
}

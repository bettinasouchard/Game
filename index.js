let input = document.getElementById("input"); // input zone
let secondes = document.getElementById("chrono").innerHTML; //30
let whosturn = document.getElementById("whosturn");
let monkey = document.getElementById("monkeyblabla");
let timeoutId;
let array = [];


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
  // 1.
  whosturn.innerHTML = "It's now the monkey's turn :"
  // 1.input vierge
  resetUserInput();
  // 2.timer remis à zéro
  stopTimer();
  // 3.ordi sors chiffre
  doComputerPickAfterXtime();
  // 4.start timer
  setTimeout(function () {
    whosturn.innerHTML = "It's now your turn :";
    startTimer();
  }, 3500);
  
}

/*--------------------------------------------------------------------------------*/
/* . Ordi sors un CHIFFRE APRES X TEMPS*/

function doComputerPickAfterXtime() {
  monkey.innerHTML = "Monkey is thinking ...";
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
  if (array.length <= 10) {

    if (!array.includes(parseInt(input.value))) {
      array.push(parseInt(input.value));
      document.getElementById("array").innerHTML +=
        "<li>" + input.value + "</li>";
      
    } else {
      stopTimer();
      return gameOver();
    }
  }nextStepsCallback();
}

/* . Quand touche "poussée" verifie que c'est bien entrée*/

input.addEventListener("keydown", checkKeyCode);

/*--------------------------------------------------------------------------------*/
let visibleArray = document.getElementById("array"); //<p ID="ARRAY"> Numbers already given : </p>
let reponse = document.getElementById("reponse"); // <p>Monkey said ...</p> <p ID=REPONSE > X <p/>

function randomvariable() {
  let randomNum = nombreHasard(1, 11);

  if (array.length <= 10) {
    if (!array.includes(randomNum)) {
      array.push(randomNum);
      setTimeout(function () {
        reponse.innerHTML = "";
      }, 2000);
    } else if (array.includes(randomNum)) {
      return randomvariable();
    }
  } else {
    return "you won";
  }

  visibleArray.innerHTML += "<li>" + randomNum + "</li>";
  reponse.innerHTML = randomNum;
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
// Retire hidden, montre cadre avec option retry ou quit

let gamestart = document.getElementById("startgame");
gamestart.addEventListener("click", startGame);
let carddisappear = document.getElementById("yourturn");

function startGame() {
  carddisappear.classList.add("hidden");
  startTimer();
}

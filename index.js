let input = document.getElementById("input"); // input zone
let secondes = document.getElementById("chrono").innerHTML; //30
let whosturn = document.getElementById("whosturn");
let monkey = document.getElementById("monkeyblabla");
let timeoutId;
let array = [];

let level = 0;

/* 



let levels = 0;
let minmax = [{min:1, max:11},{min:1, max:21},{min:1, max:31},{min:1, max:41},{min:1, max:51}]

*/


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
  whosturn.innerHTML = "It's now the Mr Bot's turn :";
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
    } else if ((array.includes(parseInt(input.value)))) {
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
  let randomNum = nombreHasard(1, (level + 1));

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
  reponse.innerHTML = randomNum;}
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
// Retire hidden, montre cadre avec option retry ou quit

let levelBtns = document.querySelectorAll(".startgame");
levelBtns.forEach(btn => {
  btn.addEventListener("click", () => startGame(Number(btn.id)));
})

let carddisappear = document.getElementById("yourturn");

function startGame(number) {
  level = number;
  input.placeholder = `Between 1 and ${level}`
  carddisappear.classList.add("hidden");
  startTimer();
}

function nextLevel() {

  startGame((level + 10))
}

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
  if(array.length === level){
    stopTimer();
    setTimeout(function () {
    resetUserInput();
    youwon.classList.remove("hidden")}, 2000);
    nextLevel();
  }}
  
  
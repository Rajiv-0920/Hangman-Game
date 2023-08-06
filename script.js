const wordEl = document.getElementById("word");
const incorrectEl = document.getElementById("incorrect");
const btnEls = document.querySelectorAll(".btn");

// Hangman
const head = document.querySelector(".head");
const body = document.querySelector(".body");
const rightHand = document.querySelector(".right-hand");
const rightLeg = document.querySelector(".right-leg");
const leftHand = document.querySelector(".left-hand");
const leftLeg = document.querySelector(".left-leg");

window.addEventListener("DOMContentLoaded", () => {
  wordEl.innerText = answerArray.join(" ");
});

const words = [
  "Dog",
  "Cow",
  "Cat",
  "Horse",
  "Donkey",
  "Tiger",
  "Lion",
  "Panther",
  "Leopard",
  "Cheetah",
  "Bear",
  "Elephant",
  "Turtle",
  "Crocodile",
  "Rabbit",
  "Hen",
  "Pigeon",
  "Crow",
  "Fish",
  "Dolphin",
  "Frog",
  "squirrel",
  "Fox",
  "Goat",
  "Wolf",
  "Monkey",
  "Bat",
  "Giraffe",
  "Panda",
  "Cobra",
  "shark",
  "Camel",
  "Deer",
  "Lizard",
  "Zebra",
  "Bull",
  "Buffalo",
  "Sheep",
  "Mouse",
  "Owl",
  "Mole",
  "Duck",
  "Rat",
  "Snake",
  "Peacock",
];

let incorrectGuess = 0;

function pickRandomWord() {
  let randomNumber = Math.floor(Math.random() * words.length);
  let word = words[randomNumber];
  return word.toLowerCase();
}

var word = pickRandomWord();
var answerArray = [];

for (let i = 0; i < word.length; i++) {
  answerArray[i] = "_";
}

btnEls.forEach((btn) => {
  btn.addEventListener("click", () => {
    result(btn.innerHTML.toLowerCase(), btn);
  });
});

function result(clickBtn, btn) {
  if (incorrectGuess !== 6) {
    btn.disabled = true;
    let splitWord = word.split("");
    console.log(splitWord);
    for (var i = 0; i < splitWord.length; i++) {
      if (splitWord[i] === clickBtn) {
        answerArray[i] = clickBtn;
        btn.classList.add("right");
      }
    }
    isInWord = splitWord.some((w) => w === clickBtn);
    isWinner = answerArray.some((w) => w === "_");
    if (!isInWord) {
      btn.classList.add("wrong");
      incorrectGuess++;
      incorrectEl.innerText = `${incorrectGuess} / 6`;
      if (incorrectGuess === 1) {
        head.classList.add("show");
      } else if (incorrectGuess === 2) {
        body.classList.add("show");
      } else if (incorrectGuess === 3) {
        rightHand.classList.add("show");
      } else if (incorrectGuess === 4) {
        leftHand.classList.add("show");
      } else if (incorrectGuess === 5) {
        rightLeg.classList.add("show");
      } else if (incorrectGuess === 6) {
        leftLeg.classList.add("show");
      }
    }
    wordEl.innerText = answerArray.join(" ").toUpperCase();
  }
  if (incorrectGuess === 6) {
    gameOver();
  }
  if (!isWinner) {
    gameOver();
  }
}

const restartEl = document.querySelector(".restart");
const playAgain = document.getElementById("play-again");
const sadImg = document.querySelector(".sad");
const showCorrectWord = document.querySelector(".correct-word");
const congratulationImg = document.querySelector(".congratulation");

playAgain.addEventListener("click", () => {
  restartEl.classList.remove("show");
  head.classList.remove("show");
  body.classList.remove("show");
  rightHand.classList.remove("show");
  leftHand.classList.remove("show");
  rightLeg.classList.remove("show");
  leftLeg.classList.remove("show");
  incorrectGuess = 0;
  incorrectEl.innerText = `${incorrectGuess} / 6`;
  word = pickRandomWord();

  answerArray = [];
  console.log(answerArray);
  for (let i = 0; i < word.length; i++) {
    answerArray[i] = "_";
  }
  console.log(answerArray);
  wordEl.innerText = answerArray.join(" ").toUpperCase();

  btnEls.forEach((btn) => {
    btn.disabled = false;
    btn.classList.remove("wrong");
    btn.classList.remove("right");
  });
});

function gameOver() {
  btnEls.forEach((btn) => {
    btn.disabled = true;
  });
  if (incorrectGuess === 6) {
    sadImg.classList.add("show");
    congratulationImg.classList.remove("show");
    showCorrectWord.innerHTML = `The correct word was: <span>${word.toUpperCase()}</span>`;
  } else {
    congratulationImg.classList.add("show");
    sadImg.classList.remove("show");
    showCorrectWord.innerHTML = `You found the word: <span>${word.toUpperCase()}</span>`;
  }
  setTimeout(() => {
    restartEl.classList.add("show");
  }, 2000);
}

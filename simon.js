//Define variables:
const colors = ["red", "yellow", "green", "blue"];
let simonSequence = [];
let userSequence = [];
let level;

const levelDisplay = document.getElementById("levelDisplay");
const startButton = document.getElementById("startBtn");
startButton.addEventListener("click", startGame);

//function to start game & start level at 0
function startGame() {
  level = 1;
  nextLevel();
  console.log("start game function runs");
}
//function to keep track of the current level
function updateLevel() {
  levelDisplay.textContent = `Level: ${level}`;
  level += 1;
  console.log("update level function runs");
}
//function that runs the beginning of each level to empty the user array, generates a new color, and plays simonSequence
function nextLevel() {
  updateLevel();
  userSequence = [];
  generateSequence();
  playSequence(simonSequence);
  
  setTimeout(() => {
    userTurn();
  }, level * 800);
  console.log("next level function runs");
}

//function to generate a pattern by simon
function generateSequence() {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  simonSequence.push(randomColor);
  console.log("generate sequence runs");
}
//function to push user choice to userSequence array
function userTurn() {

  }


function playSequence(simonSequence) {
  simonSequence.forEach((color, index) => {
    setTimeout(() => {
      flashBtn(color);
    }, index * 800);
  });
}
function flashBtn(color) {
  const btn = document.querySelector(`[btn='${color}']`);
  btn.classList.remove("inactive");
  setTimeout(() => {
    btn.classList.add("inactive");
  }, 300);
}
//function to check user input
function checkSequence() {
  for (let i = 0; i < userSequence.length; i++) {
    if (userSequence[i] !== simonSequence[i]) {
      gameOver();
      return;
    }
  }

  if (userSequence.length === simonSequence.length) {
    if (level === 15) {
      winGame();
    } else {
      setTimeout(nextLevel, 1300);
      return;
    }
  }
  console.log("check sequence runs");
}

//function to check for end of game (when level 15 is reached)
function winGame() {
  alert(" you won! congrats!");
}
function gameOver() {
  alert("you lost, game over!");
}

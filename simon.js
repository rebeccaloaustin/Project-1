//Define variables:
const colors = ["red", "yellow", "green", "blue"];
let simonSequence = [];
let userSequence = [];
let level =1;
let gameStarted = false;

const buttons = document.querySelectorAll(".btn");
const levelDisplay = document.getElementById("levelDisplay");
const startButton = document.getElementById("startBtn");

//event listeners for buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (gameStarted) {
      const color = button.dataset.color;
      userSequence.push(color);
      checkSequence(color);
    }
  });
});
startButton.addEventListener("click", startGame);

//function to start game & start level at 0
function startGame() {
  level = 1;
  simonSequence = [];
  userSequence = [];
  gameStarted = true;
  nextLevel();
  console.log("start game function runs");
}
//function to keep track of the current level
function updateLevel() {
  levelDisplay.textContent = `Level: ${level}`;
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
//function to play simon sequence
function playSequence(sequence) {
    let i = 0;
    function playNextColor() {
        if (i < sequence.length) {
            flashBtn(sequence[i]);
            i++;
            setTimeout(playNextColor, 800);
        }
    }

    playNextColor();
}

//function to flash button
function flashBtn(color) {
  const btn = document.querySelector(`[data-color="${color}"]`);
  btn.classList.remove("inactive");
  setTimeout(() => {
    btn.classList.add("inactive");
  }, 300);
}
//function to allow user to click buttons when it's their turn 
function userTurn() {
        buttons.forEach((button) => {
            button.classList.remove("unclickable");
        });
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
    }
  }
  console.log("check sequence runs");
}

//function to end game 
function winGame() {
  alert(" you won! congrats!");
}
function gameOver() {
  alert("you lost, game over!");
  gameStarted = false;
}

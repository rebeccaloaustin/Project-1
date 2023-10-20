//Define variables:
const colors = ["red", "yellow", "green", "blue"];
let simonSequence = [];
let userSequence = [];
let level;
let gameStarted = false;

const buttons = document.querySelectorAll(".btn");
const levelDisplay = document.getElementById("levelDisplay");
const startButton = document.getElementById("startBtn");
const message = document.getElementById("messageBox");

//event listeners for buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (gameStarted) {
      const color = button.dataset.color;
      const sound = document.querySelector(`[data-sound='${color}']`);
      userSequence.push(color);
      sound.play();
      checkSequence(color);
    }
  });
});
startButton.addEventListener("click", startGame);

//function to start game & start level at 1
function startGame() {
  startButton.style.display = "none";
  message.innerText = "watch the sequence";
  level = 0;
  simonSequence = [];
  userSequence = [];
  gameStarted = true;
  nextLevel();
}
//function to keep track of the current level
function updateLevel() {
  levelDisplay.textContent = `Level: ${level}`;
}
//function that runs the beginning of each level to empty the user array, generates a new color, and plays simonSequence
function nextLevel() {
  level += 1;
  message.innerText = "watch the sequence!";
  updateLevel();
  buttons.forEach((button) => {
    button.classList.add("unclickable");
  });
  userSequence = [];
  generateSequence();
  playSequence(simonSequence);

  setTimeout(() => {
    userTurn();
  }, level * 800);
}

//function to generate a pattern by simon
function generateSequence() {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  simonSequence.push(randomColor);
}
//function to play simon sequence
function playSequence(sequence) {
  sequence.forEach((color, index) => {
    setTimeout(() => {
      flashBtn(color);
    }, index * 800);
  });
}
//function to flash button
function flashBtn(color) {
  const btn = document.querySelector(`[data-color="${color}"]`);
  const sound = document.querySelector(`[data-sound='${color}']`);
  btn.classList.remove("inactive");
  sound.play();
  setTimeout(() => {
    btn.classList.add("inactive");
  }, 300);
}
//function to allow user to click buttons when it's their turn
function userTurn() {
  buttons.forEach((button) => {
    button.classList.remove("unclickable");
  });
  message.innerText = "your turn!";
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
      message.innerText = "good job! keep it up!";
      setTimeout(nextLevel, 1300);
    }
  }
}

//function to end game
function winGame() {
  const winGameSound = document.getElementById("winGameSound");
  winGameSound.play();
  message.innerText = "Congratulations you're a genius! You win!";
}
function gameOver() {
  message.innerText = "Oh no! Game over, you lose. Press start to try again.";
  const gameOverSound = document.getElementById("gameOverSound");
  gameOverSound.play();
  startButton.style.display = "block";
  gameStarted = false;
}

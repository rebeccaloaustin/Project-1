//Define variables:
let colors = ["red", "yellow", "green", "blue"];
let simonSequence = [];
let userSequence = [];
let level = 1;
let gameStart = false;

const levelDisplay = document.getElementById("levelDisplay");
//event listener to start game
const startButton = document.getElementById("startBtn");
startButton.addEventListener("click", function() {
    if(!gameStart){
        startGame();
    }
});

function startGame() {
    gameStart = true;
    level = 1;
    simonSequence = [];
    updateLevel();
}

//function to generate a pattern by simon
function generateSequence(){
    const randomColor = colors[Math.floor(Math.random()*colors.length)];
    simonSequence.push(randomColor);
}
//function to highlight button and display simon's pattern
function displaySequence() {
    for (let i=0; i < level; i++){
        setTimeout(function(){
            flashButton(simonSequence[i]);
        }, 2000);
    }
}
function flashButton(color) {
setTimeout(function(){

},1000)
}
//function to allow user input to be stored in the empty array for user sequence
//function to check user input
function checkSequence() {
    for (let i=0; i < userSequence.length; i++){
        if (userSequence[i] !== simonSequence[i]){
            gameOver();
        }
    }
}
//function to keep track of the current level
function updateLevel() {
levelDisplay.textContent = `Level: ${level}`;
}

function nextLevel() {
    userSequence = [];
    generateSequence();
    level += 1; 
    updateLevel();
}
//function to increase the speed of the button highlight as the levels increase
//function to check for end of game (when level 15 is reached)
function gameOver(){
    gameStart = false;
}
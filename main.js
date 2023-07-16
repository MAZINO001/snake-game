const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let snakeX = 5,
  snakeY = 10;
let velocityX = 0,
  velocityY = 0;
let snakebody = [];
let setIntervalId;
let score = 0;
// getting the high score from the local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `Hihg Score :${highScore}`;

const handleGameOver = () => {
  // clearing the timer and reloading the game on game Over
  clearInterval(setIntervalId);
  alert("Game Over Press OK to reply...");
  location.reload();
};
const changeFoodPosition = () => {
  //passing a random 0-30 value as food position
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};
const initGame = () => {
  if (gameOver) return handleGameOver();

  let htmlMarkup = `<div class="food" style="grid-area : ${foodY} / ${foodX}"> </div>`;
  // Check if the snake hits the food
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    // Pushing food position to snake body
    snakebody.push([foodX, foodY]);
    //increment scoreby 10
    // score++;
    score += 10;
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);
    //add it to the score board
    scoreElement.innerText = `Score :${score}`;
    highScoreElement.innerText = `Hihg Score :${highScore}`;
  }
  // Shifting forward the value of the elements in the snake body by one
  for (let i = snakebody.length - 1; i > 0; i--) {
    snakebody[i] = snakebody[i - 1];
  }

  // Setting the first element of snake body to the current snake position
  snakebody[0] = [snakeX, snakeY];

  // Updating the snake head position based on the current velocity
  snakeX += velocityX;
  snakeY += velocityY;
  // Checking if the snake's head is out of the wall, if so, setting gameOver to true
  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }
  // Adding a div for every part of the snake body
  for (let i = 0; i < snakebody.length; i++) {
    htmlMarkup += `<div class="head" style="grid-area : ${snakebody[i][1]} / ${snakebody[i][0]}"> </div>`;
  }
  // Checking if the snake head hit the body, if so, game over
  for (let i = 1; i < snakebody.length; i++) {
    if (
      snakebody[0][1] === snakebody[i][1] &&
      snakebody[0][0] === snakebody[i][0]
    ) {
      gameOver = true;
    }
  }
  playBoard.innerHTML = htmlMarkup;
};

controls.forEach((key) => {
  //caalling changeDirection on each key click and passing dataset value as an object
  key.addEventListener("click", () =>
    changeDirection({ key: key.dataset.key })
  );
});

const changeDirection = (e) => {
  //cangin velocity value based on key pre
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
};

changeFoodPosition();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);

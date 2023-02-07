const SNAKE_SPEED = 3;
const SNAKE_BODY_EXPANSION = 1;
var lastPaintTime = 0;
let inputDirection = { x: 0, y: 0 };
let lastInputDirection = inputDirection;

let food = {
  x: 15,
  y: 10,
};

const snakeBody = [
  { x: 8, y: 8 },
  // { x: 9, y: 8 },
  // { x: 10, y: 8 },
  // { x: 11, y: 8 },
  // { x: 12, y: 8 },
];
//console.log(snakeBody);

const gameBoard = document.querySelector(".game-board");

function paint(currentTime) {
  var TimeInSeconds = (currentTime - lastPaintTime) / 1000;
  requestAnimationFrame(paint);
  if (TimeInSeconds < 1 / SNAKE_SPEED) return;

  lastPaintTime = currentTime;

  // function to update status of snake, like size, death
  update();

  // function to make the snake
  draw();
}

window.requestAnimationFrame(paint);

function draw() {
  drawSnake();
  drawFood();
}

function update() {
  gameBoard.innerHTML = "";
  snakeMove();
  snakeEatFood();
}

// Function to make the snake body
function drawSnake() {
  snakeBody.forEach((segment, index) => {
    var snakeElement = document.createElement("div");
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.style.gridRowStart = segment.y;
    // snakeElement.innerHTML = index;
    snakeElement.style.transform = "rotate(0deg)";

    if (index == 0) {
      snakeElement.classList.add("head");

      // If x = 1, snake is going towards right
      if (inputDirection.x == 1) {
        snakeElement.style.transform = "rotate(-90deg)";
      }
      // If x = -1, snake is going towards left
      else if (inputDirection.x == -1) {
        snakeElement.style.transform = "rotate(90deg)";
      }
      // If y = -1, snake is going upwards
      else if (inputDirection.y == -1) {
        snakeElement.style.transform = "rotate(180deg)";
      }
      // If y = 1, snake is going downwards
      else if (inputDirection.y == 1) {
        snakeElement.style.transform = "rotate(0deg)";
      }
    } else {
      snakeElement.classList.add("snake");
    }

    gameBoard.appendChild(snakeElement);
  });
}

// Function to add apple to the board
function drawFood() {
  //console.log("drawFood");
  var foodElement = document.createElement("div");
  foodElement.style.gridColumnStart = food.x;
  foodElement.style.gridRowStart = food.y;
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
}

// Function to control the movements of snake
function snakeMove() {
  inputDirection = getInputDirection();

  // make not just head, but other segments too move with head -- select last element and shift it to second last position and so on

  for (i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  //snake moving forward towards right
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

function getInputDirection() {
  window.addEventListener("keydown", (e) => {
    // console.log(e.key);

    switch (e.key) {
      case "ArrowUp":
        if (lastInputDirection.y == 1) break;
        inputDirection = { x: 0, y: -1 };
        break;
      case "ArrowDown":
        if (lastInputDirection.y == -1) break;
        inputDirection = { x: 0, y: 1 };
        break;
      case "ArrowLeft":
        if (lastInputDirection.x == 1) break;
        inputDirection = { x: -1, y: 0 };
        break;
      case "ArrowRight":
        if (lastInputDirection.x == -1) break;
        inputDirection = { x: 1, y: 0 };
        break;
      default:
        inputDirection = { x: 0, y: 0 };
    }
  });
  lastInputDirection = inputDirection;
  return inputDirection;
}

function snakeEatFood() {
  if (isEat()) {
    console.log("Ate");
    // A function that will return new random position of apple on the board
    food = getFoodRandomPosition();
    // function to expand snake body length by 1 div everytime apple is eaten
    expandSnake();
  }
}

// Function to check if snake ate apple or not
function isEat() {
  return snakeBody[0].x === food.x && snakeBody[0].y === food.y;
}

function getFoodRandomPosition() {
  // Generating random values (till 16 since our grid is 16*16) for coordinates of x and y
  // And since Math.random will give random numbers in decimal, we link it with Math.ceil

  // Also, while loop to check that the random position of apple never comes on top of snake body ever
  let a,
    b,
    condition = true;
  while (condition) {
    a = Math.ceil(Math.random() * 16);
    b = Math.ceil(Math.random() * 16);
    // Checking each segment/div of snake body
    condition = snakeBody.some((segment) => {
      return segment.x === a && segment.y === b;
    });
  }

  return { x: a, y: b };
}

function expandSnake() {
  for (let i = 0; i < SNAKE_BODY_EXPANSION; i++) {
    snakeBody.push(snakeBody.length - 1);
  }
}

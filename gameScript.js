var lastPaintTime = 0;
const SNAKE_SPEED = 1;
let inputDirection = { x: 0, y: 0 };
let lastInputDirection = inputDirection;

const snakeBody = [
  { x: 8, y: 8 },
  { x: 9, y: 8 },
  { x: 10, y: 8 },
  { x: 11, y: 8 },
  { x: 12, y: 8 },
];
console.log(snakeBody);

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
}

function update() {
  gameBoard.innerHTML = "";
  snakeMove();
}

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

var lastPaintTime = 0;
const SNAKE_SPEED = 1;

const snakeBody = [
  { x: 10, y: 10 },
  { x: 10, y: 10 },
  { x: 10, y: 10 },
];

function paint(currentTime) {
  var TimeInSeconds = (currentTime - lastPaintTime) / 1000;
  requestAnimationFrame(paint);
  if (TimeInSeconds < 1 / SNAKE_SPEED) return;

  lastPaintTime = currentTime;

  // function to update status of snake, like size, death
  upadate();

  // function to make the snake
  draw();
}

window.requestAnimationFrame(paint);

function draw() {}

function update() {}

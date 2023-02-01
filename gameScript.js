var lastPaintTime = 0;
const SNAKE_SPEED = 1;

const snakeBody = [
  { x: 10, y: 10 },
  { x: 10, y: 10 },
  { x: 10, y: 10 },
];

function paint(currentTime) {
  var TimeSeconds = (currentTime - lastPaintTime) / 1000;
  requestAnimationFrame(paint);
}

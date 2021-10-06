const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let score = 0;

const brickRows = 5;
const brickColumns = 9;

const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

const bricks = [];
for (i = 0; i < brickColumns; i++) {
  bricks[i] = [];
  for (j = 0; j < brickRows; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

rulesBtn.addEventListener("click", () => rules.classList.add("show"));
closeBtn.addEventListener("click", () => rules.classList.remove("show"));

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
};

const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  width: 80,
  height: 10,
  speed: 8,
  dx: 0,
};

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.fillStyle = "lightseagreen";
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, 2 * Math.PI);
  ctx.fillStyle = "lightseagreen";
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((block) => {
      ctx.beginPath();
      ctx.rect(block.x, block.y, block.w, block.h);
      ctx.fillStyle = block.visible ? "lightseagreen" : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
}

function draw() {
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

draw();

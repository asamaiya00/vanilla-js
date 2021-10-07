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

function movePaddle() {
  paddle.x += paddle.dx;

  if (paddle.x + paddle.width > canvas.width - 5) {
    paddle.x = canvas.width - paddle.width - 5;
  }

  if (paddle.x < 5) {
    paddle.x = 5;
  }
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
  if (ball.y - ball.size < 0 || ball.y + ball.size > canvas.height) {
    ball.dy *= -1;
  }
  if (ball.x - ball.size < 0 || ball.x + ball.size > canvas.width) {
    ball.dx *= -1;
  }
  if (
    ball.y + ball.size > paddle.y &&
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.width
  ) {
    ball.dy = -ball.speed;
    // ball.dx = -ball.speed;
  }

  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x &&
          ball.x + ball.size < brick.x + brick.w &&
          ball.y + ball.size > brick.y &&
          ball.y - ball.size < brick.y + brick.h
        ) {
          brick.visible = false;
          ball.dy *= -1;

          increaseScore();
        }
      }
    });
  });

  if (ball.y + ball.size > canvas.height) {
    score = 0;
    showAllBricks();
  }
}

function increaseScore() {
  score += 1;
  if (score % (brickRows * brickColumns) === 0) {
    score = 0;
    showAllBricks();
  }
}

function showAllBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      brick.visible = true;
    });
  });
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

function update() {
  movePaddle();
  moveBall();

  draw();

  requestAnimationFrame(update);
}

update();

function keyDown(e) {
  if (e.key === "ArrowRight" || e.key === "Right") {
    paddle.dx = paddle.speed;
  } else if (e.key === "ArrowLeft" || e.key === "Left") {
    paddle.dx = -paddle.speed;
  }
  if (e.key === "q") {
    ball.dx += ball.speed;
    ball.dy += ball.speed;
  }
  if (e.key === "e") {
    ball.dx -= ball.speed;
    ball.dy -= ball.speed;
  }
}

function keyUp(e) {
  if (
    e.key === "ArrowRight" ||
    e.key === "Right" ||
    e.key === "ArrowLeft" ||
    e.key === "Left"
  ) {
    paddle.dx = 0;
  }
}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

 board_border = 'black';
const board_background = 'lightgreen'; 
const snake_col = 'green';
 const snake_border = 'green';

let score = 0;
// True if changing direction
let changing_direction = false;
let food_x;
let food_y;
let dx = 10;
let dy = 0;

let snake = [
    {x: 180, y: 180},
    {x: 170, y: 180},
    {x: 160, y: 180},
    {x: 150, y: 180},
    {x: 140, y: 180}
  ]

// Get the canvas element
const snakeboard = document.getElementById("snakeboard");

const snakeboard_ctx = snakeboard.getContext("2d");
// Start game
main();
gen_food();

document.addEventListener("keydown", change_direction);

//making loop in main function 
function main() {

    if (has_game_ended()) return;

    changing_direction = false;
    setTimeout(function onTick() {
    clear_board();
    makeFood();
    move_snake();
    makeSnake();
    // Repeat
    main();
  }, 100)
}

// draw a border around the canvas
function clear_board() {
  snakeboard_ctx.fillStyle = board_background;
  snakeboard_ctx.strokestyle = board_border;
  snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
  snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

// Draw the snake on the canvas
function makeSnake() {
  // Draw each part
  snake.forEach(makeSnakePart)
}

function makeFood() {
  snakeboard_ctx.fillStyle = 'red';
  snakeboard_ctx.strokestyle = 'darkgreen';
  snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
  snakeboard_ctx.strokeRect(food_x, food_y, 10, 10);
}


function makeSnakePart(snakePart) {

  
  snakeboard_ctx.fillStyle = snake_col;

  snakeboard_ctx.strokestyle = snake_border;
  
  // the part is located
  snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function has_game_ended() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > snakeboard.width - 10;
  const hitToptWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > snakeboard.height - 10;
  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function random_food(min, max) {
  return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function gen_food() {
  // Generate food coordinates
  food_x = random_food(0, snakeboard.width - 10);
  food_y = random_food(0, snakeboard.height - 10);
  snake.forEach(function has_snake_eaten_food(part) {
    const has_eaten = part.x == food_x && part.y == food_y;
    if (has_eaten) gen_food();
  });
}

function change_direction(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;
  
// Prevent the snake from reversing

  if (changing_direction) return;
  changing_direction = true;
  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;
  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

function move_snake() {
  // Create the new Snake's head
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  // Add the new head to the beginning of snake body
  snake.unshift(head);
  const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
  if (has_eaten_food) {
    // Increase score
    score += 10;
    // Display score on screen
    document.getElementById('score').innerHTML = score;
    // Generate new food location
    gen_food();
  } else {
    // Remove the last part of snake body
    snake.pop();
  }
}







document.addEventListener("DOMContentLoaded", function () {
    pTag = document.querySelector("div");
    newVal = document.createElement("p");
    newVal.innerHTML = '';
    pTag.appendChild(newVal);
  });
  
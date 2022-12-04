// Define the canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Define the snake
const snake = [
  { x: 150, y: 150 },
  { x: 140, y: 150 },
  { x: 130, y: 150 },
  { x: 120, y: 150 },
  { x: 110, y: 150 },
];

// Define the direction of the snake
let dx = 10;
let dy = 0;

// Define the food
let foodX;
let foodY;

// Define the score
let score = 0;

// Define the main game loop
function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move the snake
  moveSnake();

  // Draw the food if it hasn't been eaten yet
  if (foodX === undefined || foodY === undefined) {
    foodX = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    foodY = Math.floor(Math.random() * (canvas.height / 10)) * 10;
  }
  drawFood(foodX, foodY);

  // Draw the snake
  drawSnake();

  // Set the game loop to run every 100 milliseconds
  setTimeout(gameLoop, 100);
}

function drawFood(foodX, foodY) {
  // Draw the food on the canvas
  ctx.fillStyle = "red";
  ctx.strokeStyle = "black";
  ctx.fillRect(foodX, foodY, 10, 10);
  ctx.strokeRect(foodX, foodY, 10, 10);
}


// Define the function to move the snake
// Define the function to move the snake
function moveSnake() {
  // Get the current position of the snake's head
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};

  // Check if the snake is out of bounds
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    // Stop the game loop
    return;
  }

  // Check if the snake has collided with itself
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      // Stop the game loop
      return;
    }
  }

  // Check if the snake has eaten the food
  if (head.x === foodX && head.y === foodY) {
    // Increase the score
    score++;
    foodX = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    foodY = Math.floor(Math.random() * (canvas.height / 10)) * 10;
    // Generate new food
    drawFood(foodX, foodY);
  } else {
    // Remove the last element of the snake
    snake.pop();
  }

  // Add the new position of the snake's head to the beginning of the snake
  snake.unshift(head);
}

// Define the function to draw the snake
function drawSnake() {
  // Loop through the snake and draw each segment
  snake.forEach((segment) => {
    ctx.fillStyle = "lightgreen";
    ctx.strokeStyle = "darkgreen";
    ctx.fillRect(segment.x, segment.y, 10, 10);
    ctx.strokeRect(segment.x, segment.y, 10, 10);
  });

  // Draw the score
  ctx.fillStyle = "white";
  ctx.font = "bold 24px sans-serif";
  ctx.fillText(`Score: ${score}`, 10, 30);
}

// Listen for key presses to change the direction of the snake
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && dx === 0) {
    dx = -10;
    dy = 0;
  }
  if (event.key === "ArrowUp" && dy === 0) {
    dx = 0;
    dy = -10;
  }
  if (event.key === "ArrowRight" && dx === 0) {
    dx = 10;
    dy = 0;
  }
  if (event.key === "ArrowDown" && dy === 0) {
    dx = 0;
    dy = 10;
  }
});

// Start the game loop
gameLoop();

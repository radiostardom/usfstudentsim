// A basic avoid the squares game
// Use the left and right arrow keys to move the blue square
// If the blue square collides with the red square, the game ends

var playerX; // X-coordinate of the player square
var playerSize = 80; // Size of the player square
var squareX, squareY; // X and Y coordinates of the moving square
var squareSize = 80; // Size of the moving square
var squareSpeed = 6; // Speed of the moving square
var collided = false; // Game over state
var scrollSpeed = 0; // bg scroll
var mapbg = true;
var timer = 20;
var playersOn = true;
var enemyImages = []; // Array to store enemy images
var currentEnemyIndex; // Index for the current enemy image
var playerImage;
var showRewindButt = false;

function preload() {
  myFont = loadFont("../RubikMonoOne-Regular.ttf");
  playerImage = loadImage("../img/player.png");
  retry = loadImage("../img/retry.png");
}

function setup() {
  createCanvas(400, 400);
  playerX = width / 2;
  squareX = random(width - squareSize);
  squareY = -squareSize;
  arrowkeys = loadImage("../img/arrows.png");

  setInterval(updateTimer, 1000);
  img = loadImage("../img/campusmap.png");
  imageMode(CENTER);
  textFont(myFont);

  enemyImages.push(loadImage("../img/enemy1.png"));
  enemyImages.push(loadImage("../img/enemy2.png"));
  enemyImages.push(loadImage("../img/enemy3.png"));
  enemyImages.push(loadImage("../img/enemy4.png"));
  enemyImages.push(loadImage("../img/enemy5.png"));

  currentEnemyIndex = floor(random(enemyImages.length));
  timer = 20;
}

function draw() {
  if (mapbg) {
    image(img, 200, 0 - scrollSpeed);
  }

  if (playersOn) {
    textSize(40);
    fill("white");
    stroke(0);
    strokeWeight(2);
    text(timer, 40, 40);
  }

  // Check for collision between player and moving square
  if (
    playerX < squareX + squareSize - 20 &&
    playerX + playerSize > squareX - 20 &&
    height - playerSize < squareY + squareSize - 10 &&
    height > squareY
  ) {
    collided = true;
  }
  // Game over state
  if (collided) {
    playersOn = false;
    squareSpeed = 0;
    background(150, 0, 0);
    stroke(0);
    textSize(40);
    fill("rgb(255,255,255)");
    textAlign(CENTER);
    showRewind();
    text("You\nran into\nsomeone!\n\nTry again?", 200, 100);
  }

  // Display the moving square
  if (playersOn) {
    image(arrowkeys, 345, 35, 80, 50);
    text("Hint:\narrow keys", 345, 73);

    // Draw the current enemy image
    image(
      enemyImages[currentEnemyIndex],
      squareX,
      squareY,
      squareSize,
      squareSize
    );

    // Display the player square
    fill(0, 0, 255);
    image(playerImage, playerX, height - playerSize, playerSize, playerSize);

    // Move the moving square vertically
    if (timer < 20 && timer > 0) {
      squareY += squareSpeed;
      scrollSpeed -= 0.87;
    }

    // Reset the moving square when it goes off the bottom
    if (squareY > height) {
      squareX = random(width - squareSize);
      squareY = -squareSize;
      currentEnemyIndex = floor(random(enemyImages.length));
    }

    //move the blue square depending on arrow keys
    if (keyIsDown(LEFT_ARROW)) {
      playerX -= 5; // Move the player square left
    } else if (keyIsDown(RIGHT_ARROW)) {
      playerX += 5; // Move the player square right
    }

    if (timer >= 20) {
      stroke(0);
      fill("#FF1100");
      rect(0, 120, 400, 100);
      stroke(0);
      strokeWeight(4);
      textSize(80);
      fill("rgb(255,255,255)");
      textAlign(CENTER);
      text("RUN!", 200, 200);
    }
  }
}

function updateTimer() {
  if (timer > 0) {
    // Decrement the timer by 1
    timer--;
  } else {
    mapbg = false;
    playersOn = false;
    clearInterval();
    background(0, 150, 0);
    stroke(0);
    textSize(40);
    fill("rgb(255,255,255)");
    textAlign(CENTER);
    text("You made\nit across\ncampus!", 200, 175);
    showRewind();
  }
}

function mouseClicked() {
  if (
    showRewindButt &&
    mouseX > 330 &&
    mouseX < 380 &&
    mouseY > 330 &&
    mouseY < 380
  ) {
    resetGame();
  }
}

function showRewind() {
  showRewindButt = true;
  image(retry, 355, 355, 50, 50);
}

function resetGame() {
  squareX = random(width - squareSize);
  squareY = -squareSize;

  playersOn = true;
  playerX = width / 2;
  timer = 21;
  collided = false;
  squareX = random(width - squareSize);
  squareSpeed = 6;
  scrollSpeed = 0;
  currentEnemyIndex = floor(random(enemyImages.length));
  mapbg = true;
}

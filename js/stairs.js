//sets the global variables for the sketch, including
//square position, size, and the variable to hold our
//interval
var squareX;
var squareY;
var squareSize = 100;
var falling;
var runningMan;
var showRewindButt = false;

let exhaustion = 0;
const exhaustionIncreaseRate = 1.2;
const exhaustionDecreaseRate = 0.2;
const maxExhaustion = 100;
let isGameOver = false; // Variable to track game over state
var exhausionActive = true;

function setup() {
  createCanvas(400, 400);
  bg = loadImage("../img/stairsbg.png");
  spacebar = loadImage("../img/spacebar.png");
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  squareX = squareSize / 2 - 0;
  squareY = height - squareSize / 2;

  //setInterval is used to make the square fall a bit once a second (1000 milliseconds), to add some difficulty to the game. If the 1000 milliseconds were to be a smaller number, the game would be harder because it would fall faster.
  falling = setInterval(fallDown, 1000);
  textSize(24);
  textAlign(CENTER);
}

function preload() {
  myFont = loadFont("../RubikMonoOne-Regular.ttf");
  player = loadImage("../img/player.png");
  retry = loadImage("../img/retry.png");
}

function draw() {
  noStroke();
  textFont(myFont);
  // Check if the game is won
  if (squareX >= width && squareY <= 0) {
    // If the game is won, show the winning message and stop drawing the exhaustion bar
    background("green");
    fill(255);
    textSize(20);
    stroke(0);
    text(
      "Hurrah!\n\nYou made it to the top\nof Lone Mountain!\n\nYou'll finally make it\nto class on time!",
      width / 2,
      height / 2
    );
    noStroke();
    showRewind();
  } else {
    // If the game is not won, continue drawing the game and the exhaustion bar

    background(bg); // Background color
    image(player, squareX - 50, squareY - 50, squareSize, squareSize);

    image(spacebar, 250, 300, 135, 85);

    // Increase exhaustion when space is pressed
    if (keyIsDown(32) && exhaustion < maxExhaustion && !isGameOver) {
      exhaustion += exhaustionIncreaseRate;
    }

    // Decrease exhaustion when space is not pressed
    if (exhaustion > 0 && !keyIsDown(32) && !isGameOver) {
      exhaustion -= exhaustionDecreaseRate;
    }

    // Draw exhaustion bar background
    stroke(255);
    strokeWeight(2);
    fill(91, 110, 122); // Bar background color
    rect(width / 2, 50, width - 80, 20, 10);

    // Draw the filled part of the exhaustion bar
    fill(255, 95, 86); // Filled bar color
    noStroke();
    rect(
      width / 2,
      50,
      map(exhaustion, 0, maxExhaustion, 0, width - 80),
      20,
      10
    );

    if (exhausionActive) {
      // Draw label
      textSize(16);
      fill(255); // Text color
      text("Exhaustion", width / 2, 48);
    }

    // Check if exhaustion reaches 100% and trigger game over
    if (exhaustion >= maxExhaustion && !isGameOver) {
      isGameOver = true; // Set game over state to true
    }

    // Display "Game Over" message if the game is over
    if (isGameOver) {
      background(150, 0, 0);
      textSize(20);
      exhaustionActive = false;
      fill(255); // Game over text color
      stroke(0);
      text(
        "You passed out on the\nsteps of\n Lone Mountain!\n\nDon't forget to\ntake breaks!",
        width / 2,
        height / 2
      );
      noStroke();
      showRewind();
    }
  }
}

//every second, move the square down and to the left
function fallDown() {
  if (!isGameOver && !(squareX >= width && squareY <= 0)) {
    // Move the square down and to the left
    squareX -= 15;
    squareY += 15;
  }
}

//if the spacebar is pressed, move the square up and to the right
function keyPressed() {
  if (key == " ") {
    //this means space bar, since it is a space inside of the single quotes
    squareX += 15;
    squareY -= 15;
  }
}

function showRewind() {
  showRewindButt = true;
  image(retry, 335, 335, 50, 50);
}

function mousePressed() {
  if (
    showRewindButt &&
    mouseX > 335 &&
    mouseX < 385 &&
    mouseY > 335 &&
    mouseY < 385
  ) {
    // Reset game variables to their initial values
    squareX = squareSize / 2 - 0;
    squareY = height - squareSize / 2;
    exhaustion = 0;
    isGameOver = false;
    exhausionActive = true;
  }
}

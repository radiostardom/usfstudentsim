var bg;

// Variables to hold the different buttons locations, size, etc.
var leftButtonX;
var leftButtonY;
var rightButtonX;
var rightButtonY;
var showRewindButt = false;
var buttonSize = 50;
var foodSize = 175;
var topFoodIndex = 0;
var countdownDuration = 20;
var countdownTimer;
var textColor = "#000000";
var isButtonPressed = false;
var chosenColor = "";
var showButton = true;
var startscreen = true;
let topOptions = [];
let foodDescriptions = [
  "French Toast",
  "Scrambled Eggs",
  "Crispy Bacon",
  "Toasted Bagel",
];

function preload() {
  myFont = loadFont("/RubikMonoOne-Regular.ttf");
  dons = loadImage("/img/dons.png");
  died = loadImage("/img/youdied.png");
  coolbacon = loadImage("/img/coolbacon.png");
  let frenchToast = loadImage("/img/frenchtoast.png");
  let eggs = loadImage("/img/eggs.png");
  let bacon = loadImage("/img/bacon.png");
  let bagel = loadImage("/img/bagel.png");
  retry = loadImage("/img/retry.png");

  frenchToast.resize(100, 0);
  eggs.resize(100, 0);
  bacon.resize(100, 0);
  bagel.resize(100, 0);

  topOptions = [frenchToast, eggs, bacon, bagel];
}

function setup() {
  createCanvas(600, 400);
  bg = loadImage("/img/bg.png");
  textFont(myFont);
  leftButtonX = width / 4 - 20;
  leftButtonY = height / 2 + 50;
  rightButtonX = width - 150 + 20;
  rightButtonY = height / 2 + 50;
  countdownTimer = createCountdownTimer(countdownDuration);
  rectMode(CENTER);
}

function draw() {
  if (startscreen) {
    background(bg);
    showButton = true;
    countdownDuration = 20;
    
    // Text background box (#00ff389e - semi-transparent green)
    noStroke();
    fill("#00ff389e");
    rect(width / 2, 70, 500, 55, 10);
    textSize(20);

    // Pick a safe breakfast text
    textAlign(CENTER);
    fill("white");
    stroke(0);
    strokeWeight(2);
    text("Pick a safe breakfast!", width / 2, 83);

    // Draw the triangle buttons
    fill("#FFCF51");
    strokeWeight(3);
    stroke("#E6A703");
    triangle(
      leftButtonX - buttonSize / 2,
      leftButtonY,
      leftButtonX + buttonSize / 2,
      leftButtonY - buttonSize / 2,
      leftButtonX + buttonSize / 2,
      leftButtonY + buttonSize / 2
    );

    triangle(
      rightButtonX - buttonSize / 2,
      rightButtonY - buttonSize / 2,
      rightButtonX - buttonSize / 2,
      rightButtonY + buttonSize / 2,
      rightButtonX + buttonSize / 2,
      rightButtonY
    );

    // Add the images
    noStroke();
    image(
      topOptions[topFoodIndex],
      width / 2 - topOptions[topFoodIndex].width / 2,
      height / 2 - topOptions[topFoodIndex].height / 2 + 50
    );

    // Display text based on the selected food
    var foodDescription = foodDescriptions[topFoodIndex];
    fill("#FFB800");
    stroke(255, 255, 255);
    strokeWeight(6);
    textSize(30);
    textAlign(CENTER);
    text(foodDescription, width / 2, height / 2 - 30);

    // Countdown timer placed
    stroke(0);
    strokeWeight(2);
    countdownTimer.display();

    // Done button
    if (showButton) {
      noStroke();
      fill("#FFB800");
      rect(70, 350, 100, 40, 10);
      fill(255);
      textSize(18);
      stroke(0);
      strokeWeight(2);
      text("Done!", 110, height - 39); // Button text
    }
  }
}

function mouseClicked() {
  // Replay button
  if (
    mouseX > 510 &&
    mouseX < 590 &&
    mouseY > 335 &&
    mouseY < 385 &&
    showRewindButt
  ) {
    countdownTimer.start = millis();
    countdownDuration = 20;
    startscreen = true;
    showButton = false;
  }
  
  // Check if the mouse clicked the left button
  if (
    mouseX >= leftButtonX - buttonSize / 2 &&
    mouseX <= leftButtonX + buttonSize / 2 &&
    mouseY >= leftButtonY - buttonSize / 2 &&
    mouseY <= leftButtonY + buttonSize / 2
  ) {
    topFoodIndex--;
  }

  // Check if the mouse clicked the right button
  if (
    mouseX >= rightButtonX - buttonSize / 2 &&
    mouseX <= rightButtonX + buttonSize / 2 &&
    mouseY >= rightButtonY - buttonSize / 2 &&
    mouseY <= rightButtonY + buttonSize / 2
  ) {
    topFoodIndex++;
  }

  // Reset the color to the first option if the indices exceed the length of the array, loop colors too
  if (topFoodIndex >= topOptions.length) {
    topFoodIndex = 0;
  }

  if (topFoodIndex < 0) {
    topFoodIndex = topOptions.length - 1;
  }

  // Check if the mouse clicked the Done button
  if (mouseX > 10 && mouseX < 120 && mouseY > 320 && mouseY < 370) {
    startscreen = false;
    // Determine the selected food
    var selectedFood = foodDescriptions[topFoodIndex];

    // Navigate to different screens based on the selected food
    if (selectedFood === "French Toast") {
      // Navigate to the French Toast screen
      displayToast();
    } else if (selectedFood === "Scrambled Eggs") {
      // Navigate to the Scrambled Eggs screen
      displayEggs();
    } else if (selectedFood === "Crispy Bacon") {
      // Navigate to the Crispy Bacon screen
      displayBacon();
    } else if (selectedFood === "Toasted Bagel") {
      // Navigate to the Toasted Bagel screen
      displayBagel();
    }
  }
}

function createCountdownTimer(duration) {
  var timer = {
    duration: duration,
    start: millis(),

    display: function () {
      var elapsed = millis() - this.start;
      var seconds = duration - Math.floor(elapsed / 1000);
      seconds = max(0, seconds);
      fill(255);
      textSize(24);
      textAlign(RIGHT, BOTTOM);
      text("Time left: " + seconds + "s", width - 20, height - 20);

      if (seconds == 0) {
        displayStarved();
      }
    },
  };
  return timer;
}


// Bad end screen when timer is up
function displayStarved() {
  showButton = false;
  startscreen = false;
  textAlign(CENTER, CENTER);
  background(0); // Set the background color to black
  image(dons, -110, 20, 300, 400);
  fill(255); // Set text fill color to white
  textSize(40);
  stroke(0);
  strokeWeight(5);
  text("You starved\nto death.", width / 2, height / 2 - 40);
  textSize(20);
  text(
    "\n\n\n\n It was brutal.\nThe Dons mascot ate you\nafterwards.",
    width / 2,
    height / 2 + 20
  );
  showRewind();
}


// Toast screen
function displayToast() {
  showButton = false;
  textAlign(CENTER, CENTER);
  background(0); // Set the background color to black
  fill(255); // Set text fill color to white
  textSize(40);
  stroke(0);
  strokeWeight(5);
  image(died, width / 2 - 640, height / 2 - 400, 1280, 720);
  // text("You died.", width / 2, height / 2 - 40);
  textSize(18);
  text(
    "\n\n\n\n\n\nYou tried the french toast…\nBut it was too eggy.\n\nThere’s a chicken living\ninside you now.",
    width / 2,
    height / 2 + 20
  );
  showRewind();
}


// Eggs screen
function displayEggs() {
  showButton = false;
  textAlign(CENTER, CENTER);
  background(0); // Set the background color to black
  fill(255); // Set text fill color to white
  textSize(40);
  stroke(0);
  strokeWeight(5);
  image(died, width / 2 - 640, height / 2 - 400, 1280, 720);
  textSize(18);
  text(
    "\n\n\n\n\n\nYou tried the eggs… \nBut they were too watery.\nMysteriously watery.\n\nYou caught dysentery.",
    width / 2,
    height / 2 + 20
  );
  showRewind();
}


// Bacon screen
function displayBacon() {
  showButton = false;
  textAlign(CENTER, CENTER);
  background(0); // Set the background color to black
  fill(255); // Set text fill color to white
  textSize(40);
  stroke(0);
  strokeWeight(5);
  image(coolbacon, width / 2 - 640, height / 2 - 400, 1280, 720);
  text("You survived!", width / 2, height / 2 - 40);
  textSize(20);
  text(
    "\n\n\n\nYou tried the bacon…\nand it was delicious!\nYummy yum yum!",
    width / 2,
    height / 2 + 20
  );
  showRewind();
}


// Bagel screen
function displayBagel() {
  showButton = false;
  textAlign(CENTER, CENTER);
  background(0); // Set the background color to black
  fill(255); // Set text fill color to white
  textSize(40);
  stroke(0);
  strokeWeight(5);
  image(died, width / 2 - 640, height / 2 - 400, 1280, 720);
  //text("You died.", width / 2, height / 2 - 40);
  textSize(18);
  text(
    "\n\n\n\n\n\nYou tried the bagel…\nBut it was too hard and you choked.\n\n...and Bon Appétit made you into\na new bagel spread.",
    width / 2,
    height / 2 + 20
  );
  showRewind();
}


function showRewind() {
  showRewindButt = true;
  image(retry, 535, 335, 50, 50);
}

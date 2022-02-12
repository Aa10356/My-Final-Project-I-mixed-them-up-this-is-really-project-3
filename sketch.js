var snake, apple;
var appleImage
var appleSound
unitTime = 1;
speed = 15;
unitWidth = 25
var score = 0;
lastTime = 0

function preload() {
  appleImage = loadImage("apple.png")
  appleSound = loadSound("applebite.mp3")
}

function setup() {
  createCanvas(windowWidth-5, windowHeight-5);
  snakeGroup = new Group();
  snake = createSprite(200, 200, unitWidth, unitWidth);
  snake.shapeColor = "green";
  snakeGroup.add(snake);
  
  appleGroup = new Group();

  edges = createEdgeSprites();
}

function draw() 
{
  background(30);
  textSize(30)
  text("Score: "+score,50,50);

  if (edges.isTouching(snake)){
    snakeGroup.setSpeedAndDirectionEach(0, 0);
    text("Game over!", displayWidth / 2, displayHeight / 2);
    appleGroup.destroyEach();
  } else {
    if (keyDown("right")) {
      snake.setSpeedAndDirection(5 + score * 2, 0);
    }
    if (keyDown("left")) {
      snake.setSpeedAndDirection(5 + score * 2, 180);
    }
    if (keyDown("up")) {
      snake.setSpeedAndDirection(5 + score * 2, -90);
    }
    if (keyDown("down")) {
      snake.setSpeedAndDirection(5 + score * 2, 90);
    }
  }

  if (World.seconds == (lastTime + unitTime)) {
    lastTime = World.seconds;

    var s = createSprite(200, 200, unitWidth, unitWidth);
    s.shapeColor = "green";

    snakeGroup.add(s);
  }
  for (var i = snakeGroup.length-1; i > 0; i--) {
    snakeGroup.get(i).x = snakeGroup.get(i-1).x
    snakeGroup.get(i).y = snakeGroup.get(i-1).y
  }
  //unitWidth += .1;
  drawSprites();


  spawnApples()

  for (let i = 0; i < appleGroup.length; i++) {
    if (appleGroup.get(i).isTouching(snake)) {
      appleSound.play();
      score += 1
      appleGroup.get(i).destroy();
    }
  }
}



function spawnApples() {
  if (frameCount % 60 === 0) {
    apple = createSprite(random(0, displayWidth), random(0, displayWidth), unitWidth, unitWidth);
    apple.addImage("apple.png", appleImage);
    apple.scale = 0.1
    apple.lifetime = 400;
    appleGroup.add(apple);
  }
}
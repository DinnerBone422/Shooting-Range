var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;
var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("./Assets/gun1.png")
  bulletImg = loadImage("./Assets/bullet1.png")
  blueBubbleImg = loadImage("./Assets/waterBubble.png")
  redBubbleImg = loadImage("./Assets/redbubble.png")
  backBoardImg= loadImage("./Assets/back.jpg")
}

function setup() {
  //Create the canvas
  canvasW = windowWidth/1.5;
  canvasH = windowHeight/1.5;
  var canvas = createCanvas(canvasW, canvasH);
  canvas.parent('Game');
  rectMode(CENTER);

  //Create the backboard as a sprite
  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  //Create the Gun as a sprite
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2

  //Create the Bullets sprite
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  
  //Create the element's to display the score and the life's remaining
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  //Set the background colour
  background("#BDA297");
  
  //Display the life's remaining
  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  //Display the score
  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  //If the player is still alive then do this
  if (gameState===1) {
    gun.y=mouseY

    //Create tragets for the player to shoot at
    if (frameCount % 80 === 0) {
      drawblueBubble();
    }
    if (frameCount % 100 === 0) {
      drawredBubble();
    }

    //if the targets hit the backboard
    if (blueBubbleGroup.collide(backBoard)){
      handleGameover(blueBubbleGroup);
    }
    if (redBubbleGroup.collide(backBoard)) {
      handleGameover(redBubbleGroup);
    }
    
    //Do this is the tagets get hit by the bullets
    if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }

    if(redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup);
    }

    drawSprites();
  }
}

function drawblueBubble(){
  bluebubble = createSprite(800,random(20,780),40,40);
  bluebubble.addImage(blueBubbleImg);
  bluebubble.scale = 0.1;
  bluebubble.velocityX = -8;
  bluebubble.lifetime = 400;
  blueBubbleGroup.add(bluebubble);
}

function drawredBubble(){
  redbubble = createSprite(800,random(20,780),40,40);
  redbubble.addImage(redBubbleImg);
  redbubble.scale = 0.1;
  redbubble.velocityX = -8;
  redbubble.lifetime = 400;
  redBubbleGroup.add(redbubble);
}

function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.y= gun.y-20
  bullet.addImage(bulletImg)
  bullet.scale=0.12
  bullet.velocityX= 7
  bulletGroup.add(bullet)
}

function handleBubbleCollision(bubbleGroup){
  if (life > 0) {
    score=score+1;
  }
  bulletGroup.destroyEach()
  bubbleGroup.destroyEach()
}

function handleGameover(bubbleGroup){
  life=life-1;
  bubbleGroup.destroyEach();    
  if (life === 0) {
    gameState=2
  } 
}
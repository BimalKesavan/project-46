
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var player,playerImage;
var police, policeImage;
var ground, groundImage, invisibleGround;
var obstacleImage1, obstacleImage2, obstacleImage3, obstacleImage4;
var obstaclesGroup, birdGroup;
var birdImage;

function preload()
{
	playerImage = loadImage("playerRunning.gif");
	policeImage = loadImage("copsChasing.gif");
	groundImage = loadImage("backgroundImage.jpg")
	obstacleImage1 = loadImage("trafficConeImage.png");
	obstacleImage2 = loadImage("carImage.png");
	obstacleImage3 = loadImage("carImage2.png");
	obstacleImage4 = loadImage("carImage3.png");
	birdImage = loadImage("birdImage.png");
}

function setup() {
	createCanvas(1500, 700);


	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
    player = createSprite(1200,600,20,20);
	player.addImage(playerImage);
	player.scale = 0.2

	police = createSprite(1400,600,20,20);
	police.addImage(policeImage);

	invisibleGround = createSprite(700,700,2000,10);
	invisibleGround.visible = false;

	ground = createSprite(700,350,1400,700);
	ground.addImage("ground",groundImage);
	ground.x = ground.width /2;

        obstaclesGroup=createGroup();
        birdGroup=createGroup();

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);

  if (ground.x < 0){
	ground.x = ground.width/2;
  }
  if(keyDown("space")&& player.y >= 400) {
	player.velocityY = -12;
}

  player.velocityY = player.velocityY + 0.8
  police.velocityY = player.velocityY + 0.8
  
  player.collide(invisibleGround);
  police.collide(invisibleGround);

  spawnObstacles();
  spawnBirds();
  drawSprites();
 
}
function spawnObstacles(){
if (frameCount % 100 === 0){
   var obstacles = createSprite(0,625,10,40);
   obstacles.velocityX = 6;
   
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacles.addImage(obstacleImage1);
              break;
      case 2: obstacles.addImage(obstacleImage2);
              break;
      case 3: obstacles.addImage(obstacleImage3);
              break;
      case 4: obstacles.addImage(obstacleImage4);
              break;
      default: 
              break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacles.scale = 0.5;
    obstacles.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacles);
 }
}
function spawnBirds(){
 if (frameCount % 334 === 0){
   var bird = createSprite(0,400,20,20);
   bird.velocityX = 7;
   bird.addImage(birdImage);
   bird.scale = 0.2;
   bird.lifetime = 300;
   birdGroup.add(bird);
 }


 

}






 
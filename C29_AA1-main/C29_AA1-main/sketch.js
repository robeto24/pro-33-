const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var cuerda,cuerda3,cuerda4;
var fondo;
var rabbit;
var melon;
var cut;
var rabbit2;
var cut2,cut3,cut4;
var blink,sad,eat;
var fondo2,air,cortar,comer,triste;
var globo; 
var cr3,cr4;



function preload(){

fondo = loadImage("background.png");
rabbit = loadImage("Rabbit-01.png");
melon = loadImage("melon.png");
cut = loadImage("cut_button.png");
blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
eat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
fondo2 = loadSound("sound1.mp3");
air = loadSound("air.wav");
cortar = loadSound("cortar.mp3");
comer = loadSound("eating_sound.mp3");
triste = loadSound("sad.wav");
blink.playing = true;
eat.playing = true;
eat.looping = false; 
sad.looping = false;



}
function setup() 
{
  var mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(mobile){
    canWidth = displayWidth;
    canheight = desplayHeight;
    createCanvas(displayWidth + 80, displayHeight);
  }
  else{
    canWidth = windowWidth
    canHeight = windowHeight
    createCanvas(windowWidth,windowHeight);
  }

  frameRate(80);
  eat.frameDelay = 20 
  blink.frameDelay = 20 
  sad.frameDelay = 20 
  rabbit2 = createSprite(250,600,50,50)
  rabbit2.addAnimation("blink2",blink);
  rabbit2.addAnimation("eat2",eat)
  rabbit2.addAnimation("sad2",sad)
  rabbit2.changeAnimation("blink2",blink)
  rabbit2.scale = 0.3;

  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);
  cuerda = new Rope(15,{x:130,y:0});
  cuerda3 = new Rope(10,{x:250,y:0});
  cuerda4 = new Rope(5,{x:400,y:0});
  var fruit_opcions = {density:0.001};
  fruit = Bodies.circle(250,200,15,fruit_opcions);
  Matter.Composite.add(cuerda.body,fruit);
  cr = new Cuerpo(cuerda,fruit)
  cr3 = new Cuerpo(cuerda3,fruit)
  cr4 = new Cuerpo(cuerda4,fruit)

  cut2 = createImg("cut_button.png");
  cut2.position(130,0);
  cut2.size(50,50);
  cut2.mouseClicked(soltar)

  cut3 = createImg("cut_button.png");
  cut3.position(250,0);
  cut3.size(50,50);
  cut3.mouseClicked(soltar3)

  cut4 = createImg("cut_button.png");
  cut4.position(400,0);
  cut4.size(50,50);
  cut4.mouseClicked(soltar4)
 
 
 
  globo = createImg("balloon.png");
  globo.position(10,250);
  globo.size(150,100);
  globo.mouseClicked(globoFunction);


  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{

  
  background(fondo);
 if(!fondo2.isPlaying()){

  fondo2.play();
  fondo2.setVolume(0.2);
 }
  ground.show();
  cuerda.show();
  cuerda3.show();
  cuerda4.show();
  imageMode(CENTER)

  
  Engine.update(engine);
  
if(fruit!=null){

  image(melon,fruit.position.x,fruit.position.y,100,100);

}
 if(collide(fruit,rabbit2)==true){
 comer.play();
  rabbit2.changeAnimation("eat2")
 }
 if(collide(fruit,ground.body)==true){
rabbit2.changeAnimation("sad2")
 triste.play();

 }
   drawSprites();
}



function soltar(){

cuerda.break();
cr.soltar2();
cr = null;
cortar.play();



} 

function soltar3(){

  cuerda3.break();
  cr3.soltar2();
  cr3 = null;
  cortar.play();
  
  
  
  } 

  function soltar4(){

    cuerda4.break();
    cr4.soltar2();
    cr4 = null;
    cortar.play();
    
    
    
    } 
function collide(body,sprite){

  if(body!=null){
  var distancia = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);  
  }

  if(distancia<30){

World.remove(engine.world,fruit);
fruit = null
  return true;
  }
  else{return false};
}

function globoFunction(){

 Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})

}


//soundtrack - Horse with no name; House of the rising sun; The good, the bad, the ugly theme

static Horse Raspberry;
Background[] back;
static obstacle[] obstacles;
boolean gameLive;
int level;
float score;
Animation dogAnimation;
Animation horseAnimation;
Animation snakeAnimation;
Animation vultureAnimation;
Animation tumbleweedAnimation;
PImage backgroundPicture;

void setup() {
  size(1200, 450);
  frameRate(32);
  textSize(32);
  fill(255,0,0);
  gameLive = false;
  level = 1;
  
   
  
  // Makes horse
  horseAnimation = new Animation("data/horse/horse_", 7);
  dogAnimation = new Animation("data/prairiedog/prairiedog_", 29);
  snakeAnimation  = new Animation("data/rattlesnake/rattle_", 5);
  vultureAnimation = new Animation("data/vulture/vulture_", 7);
  tumbleweedAnimation = new Animation("data/tumbleweed/tumbleweed_", 8);
  backgroundPicture = loadImage("data/background2.jpg");
  
  Raspberry = new Horse(new PVector(30, height - 250), horseAnimation);

  
  back = new Background[] {new Background(0,0),new Background(width,0)};
  Raspberry.frameAcc = 1.25;
      
     for(Background b : back){
     b.display(); 
    }
}

void draw() { 
    background(255);
    if(gameLive){
     score += 1.25;
    if(score > 500){
     score = 0;
     level++;
     if(obstacles[1] == null){
     obstacles[1] = randomObstacle();
     }else if(obstacles[2] == null){
      obstacles[2] = randomObstacle();
     }
    }
    
    for(Background b : back){
     b.display();
     b.move();
    } 
   for(int i = 0; i< obstacles.length; i++){
     if(obstacles[i] != null){   
     obstacles[i].move();
        obstacles[i].display();
        if(obstacles[i].gotKill()){
         gameOver();
       
     }
     if(obstacles[i].isGone()){
       obstacles[i] = randomObstacle();
    }
    
      
    }}
    
    Raspberry.move();
    
    }
    
    Raspberry.display();
    text("Raspberry Lanes 2: UNBOUND", 0, 40); 
    //text("Frame Rate : " + frameRate, 0, 400);
    
}


void startGame(){
  gameLive = true;
  Raspberry = new Horse(new PVector(30, height - 250), horseAnimation);
  back = new Background[] {new Background(0,0),new Background(width,0)};
  Raspberry.frameAcc = 1.25;
  obstacles = new obstacle[]{new Tumbleweed(), null, null};
  level = 1;
  score = 0;
  
}

void keyPressed(){
  if(key == ' '){
    if(gameLive){
      Raspberry.jump();
    }else{
     startGame(); 
      
    }
    
    
    
  }
  
  
}

interface obstacle{
 void move();
 void display();
 boolean gotKill();
 boolean isGone();
  
}

class Background{
 PVector location;
 

 Background(float xloc, float yloc){
   location = new PVector(xloc,yloc);
   
   
 }

 
  void display(){
   image(backgroundPicture, location.x, location.y,width+25,height);
    
  }
  void move(){
   location.x -= 25;
   if(location.x < (-width)){
    location.x = width; 
   }
    
  }
  
  
}


// Class for animating a sequence of GIFs


class Animation {
  PImage[] images;
  int imageCount;
  
  Animation(String imagePrefix, int count) {
    imageCount = count;
    images = new PImage[imageCount];

    for (int i = 0; i < imageCount; i++) {
      // Use nf() to number format 'i' into four digits
      String filename = imagePrefix + nf((i), 4) + ".gif";
      images[i] = loadImage(filename);
    }
  }

  void display(float xpos, float ypos, float frame, float xsize, float ysize) {
    int intFrame = Math.round(frame);
    pushMatrix();
    PImage draw = images[intFrame];
    image(draw, xpos, ypos, xsize,ysize);
    popMatrix();
  }
  
  int getWidth() {
    return images[0].width;
  }
}


class Horse{
 Animation deerAnimation;
 float frame;
 float frameAcc;
 PVector size;
 PVector location;
 PVector velocity;
 PVector acceleration;
 boolean inJump;
 
 Horse(PVector loc, Animation anim){

   deerAnimation = anim;
   location = loc;
   size = new PVector(200,125);
   
   frame = 0;
   frameAcc = 0;
   velocity = new PVector(0,0);
   acceleration = new PVector(0,0);
 }
 void move(){
   frame += frameAcc * (.5);
   if(frame > 6){
    frame = 0; 
   }
   if(inJump){
    frame = 3; 
    velocity.add(acceleration);
    location.add(velocity);
    if(location.y > height-250){
      location.y = height-250;
      inJump = false;
    }
   }
   
 }
 void display(){
   deerAnimation.display(location.x, location.y, frame, size.x, size.y); 
 }
 void jump(){
   if(!inJump){
     inJump = true;
     velocity.y = -30;
     acceleration.y = 3;
   }
 }
  
}

class Rattler implements obstacle{
  PVector location;
  Animation animation;
  float frame;
  PVector size;
   Rattler(){
     animation = snakeAnimation;
     location = new PVector(width, height-200);
     size = new PVector(200,150);
     
   }
  void display(){
    animation.display(location.x, location.y, frame, size.x, size.y); 
  }
   
  void move(){
   location.x -= (25);
   
   frame += 1;
   if(frame > 4){
    frame = 0; 
   }
  }
  boolean gotKill(){
    if((Math.abs(location.x - (Raspberry.location.x + Raspberry.size.x - 100)) < 10) && Raspberry.location.y > height-300){
      return true;
      
    }
    return false;
    
    
  }
  boolean isGone(){
    if(location.x < (-size.x)){
        return true;
   }
   return false;
    
  }
  
  
  
}




class Vulture implements obstacle{
  PVector location;
  float frame;
  PVector size;
   Vulture(){
     
     location = new PVector(width, height-400);
     size = new PVector(200,150);
     
   }
  void display(){
    vultureAnimation.display(location.x, location.y, frame, size.x, size.y); 
  }
   
  void move(){
   location.x -= (25);
   location.x -= 3;
   frame += .25;
   //frame += 0.4;
   if(frame > 6){
    frame = 0; 
   }
  }
  boolean gotKill(){
    if((Math.abs(location.x - (Raspberry.location.x + Raspberry.size.x - 100)) < 10) && Raspberry.location.y < height-350){
      return true;
      
    }
    return false;
    
    
  }
  boolean isGone(){
    if(location.x < (-size.x)){
        return true;
   }
   return false;
    
  }
  
  
  
}

class PrairieDog implements obstacle{
  PVector location;
  float[] frames;
  PVector size;
  int frameNum;
   PrairieDog(){
     frameNum = 29;
     
     location = new PVector(width, height-150);
     size = new PVector(75,75);
     frames = new float[] {random(frameNum)};
   }
  void display(){
    for(int i = 0; i<frames.length; i++){
      dogAnimation.display(location.x + size.x*i, location.y, frames[i], size.x, size.y);
    }
  }
   
  void move(){
   location.x -= (25);
   
   for(int i = 0; i< frames.length; i++){
     frames[i] += 0.3;
   if(frames[i] > frameNum-1){
    frames[i] = 0; 
   }
   }
   
  }
  boolean gotKill(){
    for(int i = 0; i< frames.length; i++){
    if((Math.abs((location.x + (size.x * i) + size.x/2) - (Raspberry.location.x + (Raspberry.size.x/2)) ) < (50)) && (Raspberry.location.y > height-275) && frames[i]>= 3 && frames[0]<= 7){
      return true;
      
    }
    }
    return false;
    
    
  }
  boolean isGone(){
    if(location.x < (-size.x * 5)){
        return true;
   }
   return false;
    
  }
  
  
  
}



class Tumbleweed implements obstacle{
  PVector location;
  float frame;
  PVector size;
  PVector dSize;
  
   Tumbleweed(){
     
     location = new PVector(width, height-200);
     size = new PVector(1,1);
     dSize = new PVector(3,3);
   }
  void display(){
    tumbleweedAnimation.display(location.x, location.y, frame, size.x, size.y); 
  }
   
  void move(){
   location.x -= (25);
   location.x -= 3;
   size.add(dSize);
   //frame += .25;
   frame += 0.4;
   if(frame > 6){
    frame = 0; 
   }
  }
  boolean gotKill(){
    if((Math.abs(location.x - (Raspberry.location.x + Raspberry.size.x - 100)) < 10) && Raspberry.location.y > height-300){
      return true;
      
    }
    return false;
    
    
  }
  boolean isGone(){
    if(location.x < (-size.x)){
        return true;
   }
   return false;
    
  }
  
  
  
}


obstacle randomObstacle(){
  if(level == 1){
    return new Rattler();
  }if(level == 2){
    float r = random(2);
    if(r > 1){
      return new Vulture();
    }else{
      return new Rattler();
    }
    
  }if(level == 3){
    float r = random(3);
    if(r > 2){
      return new Vulture();
    }else if(r > 1){
      return new Rattler();
    }else{
     return new PrairieDog(); 
    }
    
  }if(level > 3){
    float r = random(4);
    if(r > 3){
      return new Vulture();
    }else if(r > 2){
      return new Rattler();
    }else if(r > 1){
      return new Tumbleweed();
    }else{
     return new PrairieDog(); 
    }
    
    
  }
  
  
  return new Rattler();
  
  
  
}

void gameOver(){
  gameLive = false;
  text("GAME OVER",0,0);
  
  
}

String message;
String[] keys;
int shift;
int asciiShift;
String[] goal;
float time;
PImage background;
float startTime;
String unEncrypted;


void setup(){
    size(800,450);
    background(0);
    background = loadImage("backgroundx.jpg");
    textSize(32);
    fill(0);
    time = 0;
    startTime = millis();
    goal = new String[] {"Merry Christmas", "We wish you a _____ ________"};
    message = "";
    unEncrypted = "";
    shift = Math.round(random(10)-5);
    asciiShift = Math.round(random(10)-5);
    keys = new String []  {"qwertyuiop","asdfghjkl","zxcvbnm","QWERTYUIOP","ASDFGHJKL","ZXCVBNM"};
  

}
void draw(){
  background(0);
  image(background, 0,0, width,height);
  textSize(64);
  fill(255);
  text(message, 0,100, 900, 1000);
  text(unEncrypted, 0, 400, 900, 1000);
  text("Hint: " + goal[1], 0, 500);
  if(!message.equals(goal)){
    time = millis()-startTime;
    time /= 1000;
    
  }
  
  text("Time :: " + (time), 1000, 50);



}
void keyPressed(){
 if(keyCode == BACKSPACE)
  if(message.length() > 0){ message = message.substring(0, message.length()-1); unEncrypted = unEncrypted.substring(0, unEncrypted.length()-1);}
 if(key == ' ') {message += " "; unEncrypted += " ";}
 
   if(keyCode == ENTER){
    message = "";
    unEncrypted = "";
    time = 0;
    startTime = millis();
    shift = Math.round(random(8)-4);
   }
 //97-122 lowercase
 //65-90 uppercase
 
 
 
 
 
 
 for(int i = 0; i< keys.length; i++){
   
   
   if(keys[i].contains(key + "")){
    unEncrypted += key;
    int keyPos = keys[i].indexOf(key);
    if(shift >= 0){ keyPos = (keyPos + shift)%keys[i].length();}
    if(shift<0) {keyPos = (keys[i].length() + shift + keyPos)%keys[i].length() ;}
    char character = keys[i].charAt(keyPos);  
    boolean isUpperCase = false;
    if(character < 91){
       isUpperCase = true;
       character += 32;
       println("UpperCase to LowerCase :: " + character);
   }
   if(shift < 0){
   character+= asciiShift;
   if(character < 97){
    character += 26;
   }
   }else{
    character += asciiShift; 
    if(character > 122){
    character-=26;
    }
     
   }
   
   println(character);
   
   
   if(isUpperCase){
     character-=32;
   }
   message += character;
   }
   
 }
}

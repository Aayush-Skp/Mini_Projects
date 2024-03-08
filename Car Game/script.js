var carposition= document.getElementById("mycar-image");
var counter= 0;
var gamestartstate = false;
var road_image= document.querySelector(".road-image");
var info= document.getElementById("info-box");
var road_move_button= document.getElementById("road-move-button");
var road_move =false;
var restart_final_board_button = document.querySelector(".restart-button-for-score");
var game_over_board = document.getElementById("game-over-board");
var score_board= document.getElementById("score-board");


//For Player Car Movement
window.addEventListener("keydown",move);
function move(e){
    var position=parseInt(window.getComputedStyle(carposition).getPropertyValue("left"));
    var position2=parseInt(window.getComputedStyle(carposition).getPropertyValue("bottom"));
    if(e.key=='ArrowLeft' && position > 20)
    {
        carposition.style.left=(position - 160) + "px";
    }
    else if(e.key=='ArrowRight' && position < 320)
    {
        carposition.style.left=(position + 160) + "px";
    }
    // to move car up and down
    if(e.key=='ArrowUp' && position2 < 200)
    {
        carposition.style.bottom= (position2 + 200) + "px";
    }
    else if(e.key=='ArrowDown' && position2 > 0)
    {
        carposition.style.bottom= (position2 - 200) + "px";
    }
}

//pause the animation
var pauseanimation = document.getElementById('botcar1-image');
pauseanimation.style.animationPlayState="paused";
var pauseanimation2 = document.getElementById('botcar2-image');
pauseanimation2.style.animationPlayState="paused";

//for pause button
window.addEventListener("keydown",move2);

function move2(f){
if(f.key == 'p')
{
  paused_state();
}

};
let pause_button=document.getElementById("pause-button");
pause_button.onclick = paused_state;

function paused_state(){
    if( (pauseanimation.style.animationPlayState == "paused") && (gamestartstate==true) )
    {
        pauseanimation.style.animationPlayState="running";
        pauseanimation2.style.animationPlayState="running"; 
     
       
    }
  else
  {
    pauseanimation.style.animationPlayState="paused";
    pauseanimation2.style.animationPlayState="paused";
    if(road_move==true)
    {road_move=false;}
    road_movement();
}
   };




//Road_movement
road_move_button.onclick = ()=>{
    if(road_move == false ){
        road_move = true; 
    }else {
        road_move = false;
    }
    road_movement();  
};

function road_movement(){
  if(road_move == true)
  {
    road_image.style.backgroundImage = "url('image/road.gif')";
  }
  else if(road_move == false){
    road_image.style.backgroundImage = "url(image/Road.jpg)";
  }

}





// Start Board
let startboard=document.getElementById("start-button");
startboard.onclick = start_the_game;

window.addEventListener("keydown",(h)=>{
if(h.key=='Enter'){
    start_the_game();
}
});


function start_the_game(){
    document.getElementById("game-start-board").style.display="none";
    pauseanimation.style.animationPlayState="running";
    pauseanimation2.style.animationPlayState="running";
    gamestartstate = true;
    //road_image.style.backgroundImage = "url('images/road.gif')";
}






//For bot Car
var botcar1= document.getElementById("botcar1-image");

let car1ValidPos = 0
let car2ValidPos = 0
const validPos = [0,160,320]



const range = ()=>{
    const arr = [0,1,2,0,1,1,0,2,2,0]
    const index = parseInt(Math.random().toString().substring(3,2))
    return arr[index]
}


botcar1.addEventListener("animationiteration",function (){
    car1ValidPos = validPos[range()]
    if(car2ValidPos === car1ValidPos){
        for(;;){
        car1ValidPos = validPos[range()]
        if(car2ValidPos !== car1ValidPos)
        break
        }
        botcar1.style.left = car1ValidPos + 'px'
    }
    else {
        botcar1.style.left = car1ValidPos + 'px'
    }
  counter+=10;
  score_board.innerHTML=counter;
});



var botcar2= document.getElementById("botcar2-image");
botcar2.addEventListener("animationiteration",function () {
car2ValidPos = validPos[range()]
if(car2ValidPos === car1ValidPos){
    for(;;){
        car2ValidPos = validPos[range()]
        if(car2ValidPos !== car1ValidPos)
        break
        }
        botcar2.style.left = car2ValidPos + 'px'   
}
else {
    botcar2.style.left = car2ValidPos + 'px'
}
        if(car2ValidPos === 160){
            botcar2.style.backgroundImage="url('image/botcar3.png')";
        }
        else{
            botcar2.style.backgroundImage="url('image/botcar2.png')";
        } 
})




//for game-restart 
let restart_button1=document.getElementById("restart-button");
restart_button1.onclick = restart_game;
restart_final_board_button.onclick= restart_game;


window.addEventListener("keydown",move3);
function move3(g){
if(g.key== 'r' )
{
    restart_game();
}
}

function restart_game(){
    location.reload()
}





  //Game Over Board
  setInterval(gameover,10);
  function gameover(){

    var car1top = parseInt(window.getComputedStyle(botcar1).getPropertyValue("top"));
    var car2top = parseInt(window.getComputedStyle(botcar2).getPropertyValue("top"));

    var car1ValidPos = parseInt(window.getComputedStyle(botcar1).getPropertyValue("left"));
    var car2ValidPos = parseInt(window.getComputedStyle(botcar2).getPropertyValue("left"));

    var playercartop= parseInt(window.getComputedStyle(carposition).getPropertyValue("top"));
    var playercarPos= parseInt(window.getComputedStyle(carposition).getPropertyValue("left"));
 

   if ( playercarPos==car1ValidPos)
  {
    if(
        ((playercartop==480) && (car1top>280) && (car1top<680)) || 
        ((playercartop==680) && (car1top>480) && (car1top<880))
     ){
       gamestats(); 
     }
  }
  else if ( playercarPos==car2ValidPos)
  {
    if(
        ((playercartop==480) && (car2top>280) && (car2top<680)) || 
        ((playercartop==680) && (car2top>480) && (car2top<880))
     ){
        gamestats();  
     }
  } 
  }; 




function gamestats(){
    road_image.style.display="none";
    document.querySelector(".final-score").innerHTML= counter;
    game_over_board.style.display="block"; 
}


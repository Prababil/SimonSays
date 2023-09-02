var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var synthsounds = ["sound/simon-s1.mp3","sound/simon-s1.mp3","sound/simon-s1.mp3","sound/simon-s1.mp3"];
var started = 0;

function nextSequence(){
    randomNumber = Math.floor(Math.random()*4);
    gamePattern.push(buttonColours[randomNumber]);
    glow(buttonColours[randomNumber]);
    document.querySelector("em").innerHTML = "LEVEL "+gamePattern.length;
    userClickedPattern = [];
    glow()
    var synth = new Audio("sound/"+buttonColours[randomNumber]+".mp3");
    synth.play(); 
}

function glow(clicked){
    $("#"+clicked).addClass(clicked);
    setTimeout(function (){
        $("#"+clicked).removeClass(clicked);
    },500);

}
$(document).keydown(function (){if(started==0){nextSequence();};started = 1;})

$("button").click(function(e){
    clicked = e.target.id;
    glow(clicked);
    userClickedPattern.push(clicked);
    i = userClickedPattern.length -1
    if (userClickedPattern[i] === gamePattern[i]){
        var synth = new Audio("sound/"+clicked+".mp3");
        synth.play(); 
    }
    else {
        document.querySelector("em").innerHTML = "game over<br>your score was "+ gamePattern.length +"<br>press any button to try again";
        gameover = new Audio("sound/gameover.mp3");
        gameover.play();
        gamePattern = [];
        userClickedPattern = [];
        started = 0;
    };
    if (userClickedPattern.length === gamePattern.length && gamePattern.length != 0){
        setTimeout(
        nextSequence,1000);
    };
});
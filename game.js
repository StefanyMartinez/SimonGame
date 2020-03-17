
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;



$("body").keypress(function(){
  if(!started){
    $("level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});

function nextSequence() {
userClickedPattern = [];
level ++;
$("#level-title").text("Level " + level);

var randomNumber = Math.floor(Math.random()*4);
var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);

animatePress(randomChosenColour); //$("#"+randomChosenColour).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
console.log(gamePattern);
}

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length){
      console.log("success");
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else {
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    playSound("wrong");

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function playSound(name) {
  var audios = new Audio ("sounds/"+name+".mp3");
  audios.play();
}

function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}

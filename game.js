
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var count = 0;

var buttonColors = [
  "red",
  "blue",
  "green",
  "yellow"
];

window.addEventListener('touchstart', function() {
  if(level === 0) {
    nextSequence();
  }
});

$(document).keypress(function() {
  if(level === 0) {
    nextSequence();
  }
});

function nextSequence() {
  count = 0;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(140).fadeIn(140);
  playSound(randomChosenColor);
  level++;
  $("h1").html("Level " + level);
  userClickedPattern = [];
}

$(".btn").click(function(event) {
  count++;
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if(gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
    }
  }
  else {
    console.log("fail");
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").html("Game Over!");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    setTimeout(function() {
      startOver();
    }, 1000);
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = true;
  $("h1").html("Press A Key to Start");
}

function playSound(forColor) {
  var audio = new Audio("sounds/" + forColor + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  var currentColorId = "#" + currentColor;
  $(currentColorId).addClass("pressed");
  setTimeout(function() {
    $(currentColorId).removeClass('pressed');
  }, 50);
}

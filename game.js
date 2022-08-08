const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var gameOver = false;

$("body").keypress(function(event) {
    if (!started){
        nextSequence();
        console.log(gamePattern);
        $("#level-title").text("Level " + level);
        started = true;
    }
});

$(".btn").click(function(event) {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);    
    playsound(userChosenColour);
    animatePress(userChosenColour);

    checkAns(userClickedPattern.length - 1);
    if (gameOver) {
        console.log("GAMEOVER");
        gameOverSeq();
    } else if (userClickedPattern.length == gamePattern.length) {
        userClickedPattern = [];
        setTimeout(() => {
            nextSequence();
            console.log(gamePattern);
        }, 1000);
    }
});

function checkAns(currentSel) {
    if (userClickedPattern[currentSel] != gamePattern[currentSel]) {
        gameOver = true;
    }
}

function nextSequence () {
    var randomNum = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNum];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playsound(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);
    console.log(gamePattern);
};

function playsound(colour) {
    var sound = new Audio("sounds/" + colour + ".mp3");
    sound.play();
};

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
};

function gameOverSeq() {
    var gameOverSound = new Audio("sounds/wrong.mp3");
    gameOverSound.play();
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over Press Any Key to Restart");
    restart();
};

function restart() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    started = false;
    gameOver = false;
}

var gamepattern =[];
var userchoosedpattern = [];

var buttoncolors = ["red","blue","yellow","green"];

var level = 0;
var started = false;

$(document).on("keypress", function(){
    if(!started){
        $("h1").text("Level " + level)
        nextSequence();
        started = true;
    }  
})

$(".btn").on("click",function(){
    var userchoosedcolor = this.id;
    userchoosedpattern.push(userchoosedcolor);
    playsound_animate(userchoosedcolor);
    check_answer(userchoosedpattern.length-1)
})



function check_answer(currentlevel){
    if(userchoosedpattern[currentlevel] == gamepattern[currentlevel]){
        console.log("success")

        if(userchoosedpattern.length == gamepattern.length){
            setTimeout(function(){
                nextSequence();
            },1000)
        }
    }
    else{
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();

        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);

        $("h1").text("Game Over, Press Any Key to Restart")
        startover();
    }
}


function nextSequence(){
    userchoosedpattern = [];

    $("h1").text("Level " + level);
    level++;
    var randomnumber = Math.floor(Math.random() * 4) ;

    var randomChosencolor = buttoncolors[randomnumber];
    gamepattern.push(randomChosencolor);
    $("#" + randomChosencolor).fadeOut(100).fadeIn(100); 
    var audio = new Audio('sounds/' + randomChosencolor + '.mp3');
    audio.play();
}


function playsound_animate(name){
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
    $("#" + name).addClass("pressed");
    setTimeout(function() {
        $("#" + name).removeClass("pressed");
    }, 100)
}

function startover(){
    level = 0;
    started = false;
    gamepattern = [];
}



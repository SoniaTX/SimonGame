var strict = 0;
var powerOn = false;
var i = 0;
var playerSeq = [];
var cpuSeq = [];
var selected = 0;

$("#powerSwitch").on("click", function() {    
    powerOn = (powerOn == false) ? true : false;
    if(powerOn) {
      $("#powerLED").removeClass("redLED");
      $("#powerLED").addClass("greenpowerLED");
      $("#displayer").html("0");
    }
    else {
      $("#powerLED").addClass("redLED");
      $("#powerLED").removeClass("greenpowerLED");
      $("#displayer").html("");
      $('.strictMode').removeClass("greenLED")
      $('.strictMode').addClass("yellowLED");
      document.getElementById("textBox").innerHTML ="Goodbye!";
    }    
});

$('#strictSwitch').on("click", function(){
  if (strict === 0){
    strict = 1;
    $('.strictMode').removeClass("yellowLED");
    $('.strictMode').addClass("greenLED");
  }else {
   strict = 0;
    $('.strictMode').removeClass("greenLED");
    $('.strictMode').addClass("yellowLED");
  }
});  

$('#start').on("click", function(){
    $('#start').hide();
    simonPlays();
});
    
function quadOne(){
        $('#1').addClass("green-active");
       new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3').play();
     setTimeout(function(){
         $('#1').removeClass("green-active");
        }, 500);
  }
  
function quadTwo(){
        $('#2').addClass("red-active");
         new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3').play();
      setTimeout(function(){
         $('#2').removeClass("red-active");
        }, 500);
  }

function quadThree(){
     $('#3').addClass("yellow-active");
          new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3').play();
      setTimeout(function(){
         $('#3').removeClass("yellow-active");
        }, 500);
  }

function quadFour(){
     $('#4').addClass("blue-active");
          new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3').play();
       setTimeout(function(){
         $('#4').removeClass("blue-active");
        }, 500);
  }

function sequence(){
    var i = 0;
    var move = setInterval(function(){
    var turn = playerSeq[i];

       if(turn === 1){
       quadOne();
      }
       if(turn === 2){
        quadTwo();
      }
        if(turn === 3){
          quadThree();
      }
        if(turn === 4){
         quadFour();
      }
     if (i === playerSeq.length-1) {
      document.getElementById("textBox").innerHTML ="Your Turn!";
      clearInterval(move);
    }
     i++;
   }, 1000);
    selected = 1;
  }

function simonPlays(){
  document.getElementById("textBox").innerHTML ="Simon's Turn!";
  if(playerSeq.length === 10){
    document.getElementById("textBox").innerHTML ="You Win!";
            playerSeq = [];
             $('#displayer').html(playerSeq.length);
             $('#start').show();
             return;
        }
    playerSeq.push(Math.floor(Math.random() * 4 + 1));
     $('#displayer').html(playerSeq.length);
     sequence();
  }
  
  function checkSeq(){
  if(cpuSeq[i] === playerSeq[i] && cpuSeq.length === playerSeq.length){
        i = 0;
        cpuSeq = [];
        selected = 0;
        simonPlays();
  }else
  if(cpuSeq[i] === playerSeq[i] && cpuSeq.length !== playerSeq.length){
    i++;
  }else 
    if(cpuSeq[i] !== playerSeq[i] && strict === 0){
      new Audio("https://www.myinstants.com/media/sounds/wrong_4wlZSJh.mp3").play();
      document.getElementById("textBox").innerHTML ="Try again!";
      selected = 0;
      i = 0;
      cpuSeq = [];
    setTimeout(function(){
    sequence();
        }, 500);
  }else 
    if(cpuSeq[i] !== playerSeq[i] && strict === 1){
      document.getElementById("textBox").innerHTML ="Wrong! Start from 0.";
      new Audio("https://www.myinstants.com/media/sounds/wrong_4wlZSJh.mp3").play();
      selected = 0;
      i = 0;
      cpuSeq = []; 
      playerSeq = [];
       $('#displayer').html(playerSeq.length);
      $('#start').show();
      return;
  }  
};
 
  $("#1").on("click", function(){
  if(selected === 1){
    quadOne();
    cpuSeq.push(1);
    checkSeq();
  }
  });

   $("#2").on("click", function(){
  if(selected === 1){
     quadTwo();
     cpuSeq.push(2);
     checkSeq();
  }
  });

   $("#3").on("click", function(){
  if(selected === 1){
     quadThree();
     cpuSeq.push(3);
     checkSeq();
  }
  });

  $("#4").on("click", function(){
  if(selected === 1){
    quadFour();
    cpuSeq.push(4);
    checkSeq(); 
  }
});

$('#restart').on("click", function(){
    document.getElementById("textBox").innerHTML ="New Game!";
    playerSeq = [];
    cpuSeq = [];
    $('#displayer').html(playerSeq.length);
    $('#start').show();
});
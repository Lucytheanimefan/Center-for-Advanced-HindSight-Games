//VARIABLES
var totalRounds = 10; //global
var totalBalls = 15; //global
var totalPins = 10; //changes
var totalScore = 0;
var currentMonth = 1;

var circlePositions = [];
var margin = {
        top: 50,
        right: 100,
        bottom: 200,
        left: 100
    },
    width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

for (var i = 0; i < 10; i++) {
    circlePositions.push(i);
}
/*---------------------------------------FUNCTIONS--------------------------------------*/

function popitup(url) {
    newwindow=window.open(url,'name','height=200,width=150');
    if (window.focus) {newwindow.focus()}
    return false;
}


drawPins(circlePositions, 'blue');

function drawPins(dataset, ballcolor) { //currently just circles

    var svgContainer = d3.select("#balls").append("svg")
        .attr("width", 600)
        .attr("height", 100);

    var circles = svgContainer.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")

    var circleAttributes = circles
        .attr("cx", function(d) {
            if (d < 5) {
                return d * 20 + margin.left;
            } else {
                return (d - 5) * 20 + margin.left;
            }

        })
        .attr("cy", function(d) {
            if (d < 5) {
                return 50;
            } else {
                return 70;
            }
        })
        .attr("r", 5)
        .style("fill", ballcolor);

}

function RollBall() {
    //update balls left
    totalBalls = totalBalls - 1;
    console.log(totalBalls);
    var ballsLeft = document.getElementById("BallsLeft");
    ballsLeft.innerHTML = "My Income (in Francs): " + totalBalls.toString();

    generatePinsKnockedDown(totalPins);

}

function generatePinsKnockedDown(pinsLeft) {
    //generate random number of pins knocked down
    var knockedDown = Math.floor((Math.random() * (pinsLeft + 1)));
    console.log("Knocked down: " + knockedDown);
    if (totalPins >= knockedDown) { //can't knock down more pins than are still standing
        totalPins = totalPins - knockedDown; //update total Pins count
        console.log("Pins left: " + totalPins);

        updateTotalScore(knockedDown);
        updateGUI(totalPins);
    } else { //do it again
        console.log("You did something wrong in your code");
    }
    if (totalPins == 0) {
        alert("You've knocked down all the pins, please proceed to the next round");
    }
}

function NextRound() {
    totalRounds = totalRounds - 1;
    console.log(totalRounds);
    totalPins = 10; //reset total number of pins

    //reset GUI
    circlePositions = [];
    for (var i = 0; i < 10; i++) {
        circlePositions.push(i);
    }
    drawPins(circlePositions, 'blue');

    var roundsLeft = document.getElementById("RoundsLeft");
    roundsLeft.innerHTML = "Rounds Left: " + totalRounds.toString();

    //out of rounds for the month
    if (totalRounds == 0) {
        alert("You have reached 10 games. The month is now over");
        currentMonth = currentMonth + 1;
        var current_month = document.getElementById("month");
        current_month.innerHTML = "Month: " + currentMonth.toString();

        //reset total balls and rounds
        totalBalls = 15;
        totalRounds = 10;
    }

    if (current_month>4){
        alert("Game over");
    }
}

function updateTotalScore(knockedDown) {
    totalScore = totalScore + knockedDown;
    var score = document.getElementById("TotalScore");
    score.innerHTML = "Bowling Score: " + totalScore.toString();
}

function updateGUI(pinsLeft) {
    circlePositions = [];
    for (var i = 0; i < 10 - pinsLeft; i++) {
        circlePositions.push(i);
    }

    drawPins(circlePositions, 'grey');


}

//unused FUNCTIONS
function createInitialDivs(){
    var game=document.getElementById("game");

    var month=document.createElement("div");
    month.id="month";
    game.appendChild(month);

    var gameGUI=document.createElement("div");
    gameGUI.id="gameGUI";
    var svg=document.createElement("svg");
    svg.id="balls";
    gameGUI.appendChild(svg);
    game.appendChild(gameGUI);

    var roundsleft=document.createElement("div");
    roundsleft.id="RoundsLeft";
    game.appendChild(roundsleft);

    var ballsleft=document.createElement("div");
    ballsleft.id="BallsLeft";
    game.appendChild(ballsleft);

    var totalscore=document.createElement("div");
    totalscore.id="TotalScore";
    game.appendChild(totalscore);


}
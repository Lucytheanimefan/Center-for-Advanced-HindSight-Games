var totalRounds = 10; //global
var totalBalls = 15; //global
var totalPins = 10; //changes

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

console.log(circlePositions);



function drawPins(dataset) { //currently just circles

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
        .style("fill", "green");

}

drawPins(circlePositions);

function RollBall() {
    //update balls left
    totalBalls = totalBalls - 1;
    console.log(totalBalls);
    var ballsLeft = document.getElementById("BallsLeft");
    ballsLeft.innerHTML = "Balls Left: " + totalBalls.toString();

    generatePinsKnockedDown(totalPins);

}

function generatePinsKnockedDown(pinsLeft) {
    //generate random number of pins knocked down
    var knockedDown = Math.floor((Math.random() * (pinsLeft+1)) );
    console.log("Knocked down: "+knockedDown);
    if (totalPins >= knockedDown) { //can't knock down more pins than are still standing
        totalPins = totalPins - knockedDown; //update total Pins count
        console.log("Pins left: " + totalPins);
    } else {//do it again
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

    var roundsLeft = document.getElementById("RoundsLeft");
    roundsLeft.innerHTML = "Rounds Left: " + totalRounds.toString();
}
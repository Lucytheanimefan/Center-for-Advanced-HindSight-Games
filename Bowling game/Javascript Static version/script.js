//VARIABLES
var totalRounds = 10; //global
var totalBalls = 15; //global
var totalPins = 10; //changes
var totalScore = 0;
var currentMonth = 1;
var myWealth = 0;

//storage variables for data keeping purposes
var monthlyWealth = []
var moneyEarned = [];
var option = "";


var circlePositions = [];
//var originalCirclePositions = [];
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

function fontFlash(targetText, color, fontWeight) {
    targetText.style.color = color;
    targetText.style.fontWeight = fontWeight;
    setTimeout(function() {
        targetText.style.color = "black";
        targetText.style.fontWeight = "normal";
    }, 1000);


}

function popitup(url) {
    newwindow = window.open(url, 'name', 'height=200,width=150');
    if (window.focus) {
        newwindow.focus()
    }
    return false;
}


drawPins(circlePositions, 'blue');

function firstPayments() {
    createCustomAlert("You receive 23 Francs in income this month");
    myWealth = myWealth + 23;
    wealth.innerHTML = "Wealth: " + myWealth + " Francs";
    fontFlash(wealth, "green", "bold");

    setTimeout(function() {
        createCustomAlert('You pay 8 Francs for your bowling membership bill')
        myWealth = myWealth - 8;
        wealth.innerHTML = "Wealth: " + myWealth + " Francs";
        fontFlash(wealth, "red", "bold");
    }, 3000);

}

function spendFirstIncome() {
    createCustomAlert("You receive 23 Francs in income this month");
    myWealth = myWealth + 23;
    wealth.innerHTML = "Wealth: " + myWealth + " Francs";
    fontFlash(wealth, "green", "bold");
}

function payFirst() {
    option = "pay first";
    createInitialDivs();
    //drawPins(originalCirclePositions, 'blue');
    firstPayments();

    var rollBall = document.getElementById('rollBall');

    rollBall.onclick = function() {
        RollBall();
    }

    var nextRound = document.getElementById('nextRound');
    nextRound.onclick = function() {
        NextRound(true);
    }

}

function spendFirst() {
    option = "spend first";
    createInitialDivs();

    spendFirstIncome();

    totalBalls = 23;

    var rollBall = document.getElementById('rollBall');

    rollBall.onclick = function() {
        RollBall();
    }

    var nextRound = document.getElementById('nextRound');
    nextRound.onclick = function() {
        NextRound(false);
    }
}

function drawPins(dataset, ballcolor) { //currently just circles

    var svgContainer = d3.select("#balls").append("svg")
        .attr("id", "all_balls")
        .attr("width", 600)
        .attr("height", 100);

    var circles = svgContainer.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")

    var circleAttributes = circles
        .attr("cx", function(d) {
            if (d < 5) {
                return d * 30 + margin.left;
            } else {
                return (d - 5) * 30 + margin.left;
            }

        })
        .attr("cy", function(d) {
            if (d < 5) {
                return 50;
            } else {
                return 80;
            }
        })
        .attr("r", 10)
        .style("fill", ballcolor);

}

function RollBall() {
    //update balls left
    myWealth = myWealth - 1;
    //console.log(totalBalls);
    //var ballsLeft = document.getElementById("BallsLeft");
    wealth.innerHTML = "Wealth: " + myWealth.toString() + " Francs";

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
        createCustomAlert("You've knocked down all the pins, please proceed to the next round");
    }
}

function NextRound(payFirst) {
    totalRounds = totalRounds - 1;
    console.log(totalRounds);
    totalPins = 10; //reset total number of pins

    //reset GUI
    circlePositions = [];
    for (var i = 0; i < 10; i++) {
        circlePositions.push(i);
    }
    //d3.select('#all_balls').remove();
    drawPins(circlePositions, 'blue');

    var roundsLeft = document.getElementById("RoundsLeft");
    roundsLeft.innerHTML = "Rounds Left: " + totalRounds.toString();

    //out of rounds for the month
    if (totalRounds == 0) {
        createCustomAlert("You have reached 10 games. The month is now over");
        currentMonth = currentMonth + 1;

        if (!payFirst) {
            createCustomAlert('You pay 8 Francs for your bowling membership bill');
            myWealth = myWealth - 8;
            wealth.innerHTML = "Wealth: " + myWealth + " Francs";
        }

        var current_month = document.getElementById("month");

        if (currentMonth == 2) {
            monthlyWealth.push(myWealth); //store the data
            moneyEarned.push(totalScore);

            current_month.innerHTML = "Month: September - <b>October</b> - November - December";
            if (payFirst) {
                firstPayments();
            } else {
                spendFirstIncome();
            };
        } else if (currentMonth == 3) {
            monthlyWealth.push(myWealth);
            moneyEarned.push(totalScore);

            current_month.innerHTML = "Month: September - October - <b>November</b> - December";
            if (payFirst) {
                firstPayments();
            } else {
                spendFirstIncome();
            };
        } else if (currentMonth == 4) {
            monthlyWealth.push(myWealth);
            moneyEarned.push(totalScore);

            current_month.innerHTML = "Month: September - October - November - <b>December</b>";
            if (payFirst) {
                firstPayments();
            } else {
                spendFirstIncome();
            };
        } else if (currentMonth > 4) {
            createCustomAlert("GAME OVER");
            monthlyWealth.push(myWealth);
            moneyEarned.push(totalScore);
            createFile();
        }


        //reset total balls and rounds
        totalBalls = 15;
        totalRounds = 10;
    }


}


function updateTotalScore(knockedDown) {
    totalScore = totalScore + knockedDown;
    var score = document.getElementById("TotalScore");
    score.innerHTML = "Money earned: " + totalScore.toString() + '&#162';
}

function updateGUI(pinsLeft) {
    circlePositions = [];
    for (var i = 0; i < 10 - pinsLeft; i++) {
        circlePositions.push(i);
    }


    drawPins(circlePositions, 'grey');
}



//unused FUNCTIONS--------------------------------------------------
function createInitialDivs() {
    var game = document.getElementById("game");
    var upperStuff = document.getElementById("upperStuff");


    var month = document.createElement("div");
    month.id = "month";
    month.innerHTML = "Month: <b>September</b> - October - November - December"
    upperStuff.appendChild(month);

    wealth = document.createElement("div");
    wealth.id = "wealth";
    wealth.innerHTML = "Wealth: ";
    upperStuff.appendChild(wealth);
    /*
        var gameGUI=document.createElement("div");
        gameGUI.id="gameGUI";
        var svg=document.createElement("svg");
        svg.id="balls";
        gameGUI.appendChild(svg);
        game.appendChild(gameGUI);
    */
    var roundsleft = document.createElement("div");
    roundsleft.id = "RoundsLeft";
    game.appendChild(roundsleft);

    var ballsleft = document.createElement("div");
    ballsleft.id = "BallsLeft";
    game.appendChild(ballsleft);

    var totalScore = document.createElement("div");
    totalScore.id = "TotalScore";
    totalScore.innerHTML = "Money earned: ";
    game.appendChild(totalScore);

    var gameButtons = document.createElement("div")
    gameButtons.id = "gameButtons";
    game.appendChild(gameButtons)

    var rollBall = document.createElement("button");
    rollBall.id = "rollBall";
    rollBall.className = "btn";
    rollBall.innerHTML = 'Roll ball'
    gameButtons.appendChild(rollBall);

    var nextRound = document.createElement("button");
    nextRound.id = "nextRound";
    nextRound.className = "btn";
    nextRound.innerHTML = "Next round";
    gameButtons.appendChild(nextRound);


}

/*------------------Write results to a file---------------------*/
function createFile() {
    var textToSave = 'this is a test';

    var hiddenElement = document.createElement('a');

    hiddenElement.href = 'data:attachment/text,' + encodeURI(option + ": \n") + encodeURI("Monthly wealth: " + monthlyWealth) + "\n" + encodeURI("Money earned: " + moneyEarned);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'bowlingInfo2.txt';
    hiddenElement.click();

}

/*---------------------Custom alert box------------------------*/
var ALERT_TITLE = "Oops!";
var ALERT_BUTTON_TEXT = "Ok";

function createCustomAlert(txt) {
    d = document;

    if(d.getElementById("modalContainer")) return;

    mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
    mObj.id = "modalContainer";
    mObj.style.height = d.documentElement.scrollHeight + "px";

    alertObj = mObj.appendChild(d.createElement("div"));
    alertObj.id = "alertBox";
    if(d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
    alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";
    alertObj.style.visiblity="visible";

    h1 = alertObj.appendChild(d.createElement("h1"));
    h1.appendChild(d.createTextNode(ALERT_TITLE));

    msg = alertObj.appendChild(d.createElement("p"));
    //msg.appendChild(d.createTextNode(txt));
    msg.innerHTML = txt;

    btn = alertObj.appendChild(d.createElement("a"));
    btn.id = "closeBtn";
    btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
    btn.href = "#";
    btn.focus();
    btn.onclick = function() { removeCustomAlert();return false; }

    alertObj.style.display = "block";

}

function removeCustomAlert() {
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
}
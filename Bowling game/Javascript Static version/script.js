//VARIABLES
var totalRounds = 10; //global
var totalBalls = 15; //global
var totalPins = 10; //changes
var totalScore = 0;
var currentMonth = 0;
var myWealth = 0;
var currDay = 1;
var currDayString = currDay.toString();

//storage variables for data keeping purposes
var monthlyWealth = {};
var moneyEarned = {};
var option = "";



var margin = {
        top: 50,
        right: 100,
        bottom: 200,
        left: 100
    },
    width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

/*---------------------------------------FUNCTIONS--------------------------------------*/
function timestamp() {
    var d = new Date();
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var days = ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
    var day = days[d.getDay()];
    var hr = d.getHours();
    var min = d.getMinutes();
    if (min < 10) {
        min = "0" + min;
    }
    var ampm = hr < 12 ? "am" : "pm";
    var date = d.getDate();
    var month = months[d.getMonth()];
    var year = d.getFullYear();

    var timestamp = day + " " + hr + ":" + min + ampm + " " + date + " " + month + " " + year;

    return timestamp;
}

function fontFlash(targetText, color, fontWeight, callback) {
    targetText.style.color = color;
    targetText.style.fontWeight = fontWeight;
    // $("#closeBtn").click(function() {
    //targetText.style.color = "black";
    //targetText.style.fontWeight = "normal";

    setTimeout(function() {
        targetText.style.color = "black";
        targetText.style.fontWeight = "normal";
        if (callback) {
            callback();
        }
    }, 1500);

    //});
    /*
    setTimeout(function() {
        targetText.style.color = "black";
        targetText.style.fontWeight = "normal";
    }, 1500);
    */

}

function popitup(url) {
    newwindow = window.open(url, 'name', 'height=200,width=150');
    if (window.focus) {
        newwindow.focus()
    }
    return false;
}


drawPins();

function firstPayments() {
    var gameUpdates = document.getElementById("gameUpdates");
    gameUpdates.innerHTML = "You <span style='color:green;'>receive</span> 23 Francs in income this month";

    //createCustomAlert("You receive 23 Francs in income this month");
    myWealth = myWealth + 23;
    wealth.innerHTML = "Wealth: " + myWealth + " Francs";
    fontFlash(wealth, "green", "bold", function() {

        //setTimeout(function() {
        gameUpdates.innerHTML = 'You <span style="color:red;"">pay</span> 8 Francs for your bowling membership bill';
        //createCustomAlert('You pay 8 Francs for your bowling membership bill')
        myWealth = myWealth - 8;
        wealth.innerHTML = "Wealth: " + myWealth + " Francs";
        fontFlash(wealth, "red", "bold");
        //}, 2500);

        setTimeout(function() {
            gameUpdates.innerHTML = "You may begin.";
        }, 1500);

    });

}

function spendFirstIncome() {
    var gameUpdates = document.getElementById("gameUpdates");
    gameUpdates.innerHTML = "You receive 23 Francs in income this month";

    //createCustomAlert("You receive 23 Francs in income this month");
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

function drawPins() { //currently just circles
    var gameGUI = document.getElementById("gameGUI");
    if ($("#pins").length == 0) {
        var pins = document.createElement("div");
        pins.id = "pins";
        gameGUI.appendChild(pins);
    } else {
        var pins = document.getElementById("pins");
    }

    for (var i = 0; i < 10; i++) {
        var bowlingPin = document.createElement("img");
        bowlingPin.src = "bowling_pin_solid.png";
        bowlingPin.style = "width:25px;height:60px";
        bowlingPin.id = "bowlingPin_" + i.toString();
        bowlingPin.className = "bowlingPins";

        pins.appendChild(bowlingPin);
    }

    /*
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
    */
}


function RollBall() {
    var gameUpdates = document.getElementById("gameUpdates");
    if (myWealth <= -15) {
        //createCustomAlert("DEBT CAN'T BE MORE THAN 15 FRANCS. Please proceed to next round");
        gameUpdates.innerHTML = "DEBT CAN'T BE MORE THAN 15 FRANCS. Please proceed to next round";

        //can't proceed to roll again
        return;

    }
    //update balls left
    myWealth = myWealth - 1;
    //console.log(totalBalls);
    //var ballsLeft = document.getElementById("BallsLeft");
    wealth.innerHTML = "Wealth: " + myWealth.toString() + " Francs";

    generatePinsKnockedDown(totalPins);

}

function generatePinsKnockedDown(pinsLeft) {
    var gameUpdates = document.getElementById("gameUpdates");
    //generate random number of pins knocked down
    var knockedDown = Math.floor((Math.random() * (pinsLeft + 1)));
    //console.log("Knocked down: " + knockedDown);
    if (totalPins >= knockedDown) { //can't knock down more pins than are still standing
        totalPins = totalPins - knockedDown; //update total Pins count
        //console.log("Pins left: " + totalPins);

        updateTotalScore(knockedDown);
        updateGUI(totalPins);
    } else { //do it again
        console.log("You did something wrong in your code");
    }
    if (totalPins == 0) {
        //createCustomAlert("You've knocked down all the pins, please proceed to the next round");
        gameUpdates.innerHTML = "You've knocked down all the pins, please proceed to the next round";
    }
}

function NextRound(payFirst) {
    var gameUpdates = document.getElementById("gameUpdates");
    totalRounds = totalRounds - 1;
    totalPins = 10; //reset total number of pins

    //reset GUI
    circlePositions = [];
    for (var i = 0; i < 10; i++) {
        circlePositions.push(i);
    }

    $("#pins").empty();
    drawPins();
    var roundsLeft = document.getElementById("RoundsLeft");
    roundsLeft.innerHTML = "Rounds Left: " + totalRounds.toString();

    //set current day
    currDay = currDay + 3;
    currDayString = currDayString + "    " + currDay.toString();
    console.log('Days: ' + currDayString);
    $('#day').html("Day of the month: " + currDayString);

    //out of rounds for the month
    if (payFirst && totalRounds == 0) {
        //createCustomAlert("You have reached 10 games. The month is now over");
        gameUpdates.innerHTML = "You have reached 10 games. The month is now over";
        console.log("MONTHLY UPDATE")
        console.log(myWealth);
        //monthlyUpdate(currentMonth, myWealth);

        currentMonth = currentMonth + 1;
        //NextMonthButton();

    } else if (!payFirst && totalRounds == 0) { //spend first option
        console.log("Spend first");
        //createCustomAlert('You pay 8 Francs for your bowling membership bill');
        gameUpdates.innerHTML = 'You pay 8 Francs for your bowling membership bill';
        myWealth = myWealth - 8;
        wealth.innerHTML = "Wealth: " + myWealth + " Francs";
        fontFlash(wealth, "red", "bold", function() {
            //createCustomAlert("You have reached 10 games. The month is now over");
            gamesUpdates.innerHTML = "You have reached 10 games. The month is now over";
            console.log("MONTHLY UPDATE")
            console.log(myWealth);
            //monthlyUpdate(currentMonth, myWealth);

            currentMonth = currentMonth + 1;
            //NextMonthButton();
        });
    }

    if (totalRounds == 0) {
        NextMonthButton();
        $("#nextMonth").click(function() {
            //reset to day 1
            currDay = 1;
            currDayString = currDay.toString();
            $('#day').html("Day of the month: " + currDayString);


            var current_month = document.getElementById("month");

            if (currentMonth == 1) {
                monthlyWealth[timestamp()] = myWealth; //store the data
                moneyEarned[timestamp()] = totalScore;
                //moneyEarned.push(totalScore);
                //monthlyUpdate(currentMonth, myWealth); //NOT WORKING?

                current_month.innerHTML = "Month: September - <b>October</b> - November - December";
                if (payFirst) {
                    console.log("pay first!");
                    firstPayments();
                } else {
                    console.log("spend first");
                    spendFirstIncome();
                };
            } else if (currentMonth == 2) {
                monthlyWealth[timestamp()] = myWealth;
                moneyEarned[timestamp()] = totalScore;

                current_month.innerHTML = "Month: September - October - <b>November</b> - December";
                if (payFirst) {
                    firstPayments();
                } else {
                    spendFirstIncome();
                };
            } else if (currentMonth == 3) {
                monthlyWealth[timestamp()] = myWealth;
                moneyEarned[timestamp()] = totalScore;

                current_month.innerHTML = "Month: September - October - November - <b>December</b>";
                if (payFirst) {
                    firstPayments();
                } else {
                    spendFirstIncome();
                };
            } else if (currentMonth > 4) {
                //createCustomAlert("GAME OVER");
                gamesUpdates.innerHTML = "<b>GAME OVER</b>";
                monthlyWealth[timestamp()] = myWealth;
                moneyEarned[timestamp()] = totalScore;
                createFile();
            }

            //reset total balls and rounds
            totalBalls = 15;
            totalRounds = 10;
            $("#nextMonth").remove();
        });

    }
}


/*
function monthlyUpdate(month, wealth) {
    var currentWealth = monthlyWealth[month];
    var currentEarning = moneyEarned[month];
    for (var i = 0; i < month; i++) {
        currentWealth = currentWealth - monthlyWealth[i];
        currentEarning = currentEarning - moneyEarned[i];
    }
    var spent = 23 - currentWealth;

    createCustomAlert("This month you spent a total of " + spent + " and earned a total of" + currentEarning + "Total earnings so far: " + totalScore + " Total wealth so far: " + myWealth);

}
*/

function updateTotalScore(knockedDown) {
    totalScore = totalScore + knockedDown;
    var score = document.getElementById("TotalScore");
    score.innerHTML = "Money earned: " + totalScore.toString() + '&#162';
}

function updateGUI(pinsLeft) {
    /*
    circlePositions = [];
    for (var i = 0; i < 10 - pinsLeft; i++) {
        circlePositions.push(i);
    }


    drawPins(circlePositions, 'grey');
*/
    var gameGUI = document.getElementById("gameGUI");
    $("#pins").empty();
    var pins = document.getElementById("pins")

    for (var i = 0; i < 10 - pinsLeft; i++) {
        var bowlingPinGrey = document.createElement("img");
        bowlingPinGrey.src = "bowling_pin_transparent.png";
        bowlingPinGrey.style = "width:25px;height:60px";
        bowlingPinGrey.id = "bowlingPinGrey_" + i.toString();
        bowlingPinGrey.className = "bowlingPins";

        pins.appendChild(bowlingPinGrey);
    }

    for (var j = 0; j < pinsLeft; j++) {
        var bowlingPin = document.createElement("img");
        bowlingPin.src = "bowling_pin_solid.png";
        bowlingPin.style = "width:25px;height:60px";
        bowlingPin.id = "bowlingPin_" + j.toString();
        bowlingPin.className = "bowlingPins";

        pins.appendChild(bowlingPin);
    }
}



//--------------------------------------------------
function NextMonthButton() {
    var nextMonth = document.createElement("button");
    nextMonth.id = "nextMonth";
    nextMonth.className = "btn";
    nextMonth.innerHTML = "Next month";
    $("#game").append(nextMonth);
}

function createInitialDivs() {
    var game = document.getElementById("game");
    var upperStuff = document.getElementById("upperStuff");

    var updateArea = document.createElement("div");
    updateArea.id = "updateArea";
    upperStuff.appendChild(updateArea);

    var updateTitle = document.createElement("div");
    updateTitle.id = "updateTitle";
    updateArea.appendChild(updateTitle);
    updateTitle.innerHTML = "Game Updates";

    var gameUpdates = document.createElement("div");
    gameUpdates.id = "gameUpdates";
    updateArea.appendChild(gameUpdates);



    var month = document.createElement("div");
    month.id = "month";
    month.innerHTML = "Month: <b>September</b> - October - November - December"
    upperStuff.appendChild(month);

    var day = document.createElement("div");
    day.id = "day";
    day.innerHTML = "Day of the month: 1";
    upperStuff.appendChild(day);

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
var ALERT_TITLE = "Wealth update!";
var ALERT_BUTTON_TEXT = "Ok";

function createCustomAlert(txt) {
    d = document;

    if (d.getElementById("modalContainer")) return;

    mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
    mObj.id = "modalContainer";
    mObj.style.height = d.documentElement.scrollHeight + "px";

    alertObj = mObj.appendChild(d.createElement("div"));
    alertObj.id = "alertBox";
    if (d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
    alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth) / 2 + "px";
    alertObj.style.visiblity = "visible";

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
    btn.onclick = function() {
        removeCustomAlert();
        return false;
    }

    alertObj.style.display = "block";

}

function removeCustomAlert() {
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
}
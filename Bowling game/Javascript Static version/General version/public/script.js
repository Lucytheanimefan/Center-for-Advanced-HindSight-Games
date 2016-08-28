//VARIABLES
var totalRounds = 10; //global
var totalBalls = 15; //global
var totalPins = 10; //changes
var totalScore = 0;
var currentMonth = 0;
var myWealth = 0;

var rectangle = makeRectangle("#DFE4EA", '17px', '5px', 0, true); //day & month rectangle
var wealthRect = makeRectangle("#DFE4EA", '25%', '5px', '5px', false);

var currDay = dayBorder('#5481C1', '1') + rectangle + dayBorder('#C3D0DC', '4') + rectangle + dayBorder('#C3D0DC', '7') +
    rectangle + dayBorder('#C3D0DC', '10') + rectangle + dayBorder('#C3D0DC', '13') + rectangle +
    dayBorder('#C3D0DC', '16') + rectangle + dayBorder('#C3D0DC', '19') + rectangle +
    dayBorder('#C3D0DC', '22') + rectangle + dayBorder('#C3D0DC', '25') + rectangle + dayBorder('#C3D0DC', '28');
var currDayString = currDay.toString();

//storage variables for data keeping purposes
var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
var monthlyWealth = {};
var moneyEarned = {};
var option = "";
var name = "No name";
var IPaddress = "";
var jsonData = {}; //json Data to return 

var uniqueCodeSent;

recordIPAddressData(); //get IP address for each game played
jsonData["start_game"] = timestamp();
jsonData["game_0"] = {};
var margin = {
        top: 50,
        right: 100,
        bottom: 200,
        left: 100
    },
    width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

function makeRectangle(color, leftpadding, toppadding, botpadding = 0, inlineBlock) {
    if (inlineBlock) {
        var rect = "<span style='padding-left:" + leftpadding + "; padding-top:" + toppadding + ";padding-bottom:" + botpadding + "; background:" + color + "; display: inline-block;height: 10px;'></span>";
        return rect;
    } else {
        var rect = "<span style='padding-left:" + leftpadding + "; padding-top:" + toppadding + ";padding-bottom:" + botpadding + "; background:" + color + ";height: 10px;'></span>";
        return rect;
    }
}

function dayBorder(color, number) {
    var dayBorder = "<span style='background:" + color + "; padding:5px 8px 5px 8px;'>" + number + "</span>";
    return dayBorder;
}

/*------------get info from form-------------*/
function searchKeyPress(e) {
    e = e || window.event;
    if (e.keyCode == 13) {
        document.getElementById('btnGo').click();
        return false;
    }
    return true;
}

function submitData() {
    name = document.getElementById("name").value;

    document.getElementById("name").value = "Successfully submitted";

    console.log(name);

}


function getData() {
    var form = document.getElementById("personalInfo");
    var getdata = document.createElement("input");
    getdata.id = "getData";
    getdata.type = "button";
    getdata.value = "Get data";
    getdata.setAttribute("onclick", "returnData()");
    form.appendChild(getdata);
}

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
    var seconds = d.getSeconds();

    var timestamp = day + " " + hr + ":" + min + ":" + seconds + ampm + " " + date + " " + month + " " + year;

    return timestamp;
}

function recordIPAddressData() {
    $.getJSON('https://api.ipify.org?format=json', function(data) {
        var IPaddress = data["ip"];
        jsonData["ip"] = IPaddress;
    });

}

//format money
function format2(n, currency) {
    return currency + " " + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}

function fontFlash(targetText, color, fontWeight, callback) {
    targetText.style.color = color;
    targetText.style.fontWeight = fontWeight;


    setTimeout(function() {
        targetText.style.color = "white";
        targetText.style.fontWeight = "normal";
        if (callback) {
            callback();
        }
    }, 250);

}

function popitup(url) {
    newwindow = window.open(url, 'name', 'height=200,width=150');
    if (window.focus) {
        newwindow.focus()
    }
    return false;
}


function showButtons() {
    $("#pins").remove();
    drawPins();
    $('#rollBall').show();
    $('#nextRound').show();
    $('#continueAfterBills').hide();
}

function showContinue(round) {
    $("#continueAfterBills").hide();

    console.log("In showContinue");
    var gameUpdates = document.getElementById("gameUpdates");

    if (round == 1) {
        myWealth = myWealth - 8;
        wealth.innerHTML = wealthRect + "<span style='background:#5481C1; padding:5px 8px 5px 8px;'>Wealth: " + myWealth + " Francs</span>" + wealthRect;
        fontFlash(wealth, "red", "bold", function() {
            gameUpdates.innerHTML = 'You <span style="color:red;"">pay</span> 8 Francs for your bowling membership bill';
            var continueAfterBills = document.getElementById('continueAfterBills');
            continueAfterBills.setAttribute('onclick', 'showContinue(2)');
            $('#continueAfterBills').show();
        });
    } else if (round == 2) {
        gameUpdates.innerHTML = "You may begin.";
        var continueAfterBills = document.getElementById('continueAfterBills');
        continueAfterBills.setAttribute('onclick', 'showButtons()');
        $('#continueAfterBills').show();
    }
}

function firstPayments() {
    var continueAfterBills = document.getElementById('continueAfterBills');
    continueAfterBills.setAttribute('onclick', 'showContinue(1)');

    var gameUpdates = document.getElementById("gameUpdates");
    gameUpdates.innerHTML = "You <span style='color:green;'>receive</span> 23 Francs in income this month";

    myWealth = myWealth + 23;
    wealth.innerHTML = wealthRect + "<span style='background:#5481C1; padding:5px 8px 5px 8px;'>Wealth: " + myWealth + " Francs</span>" + wealthRect;
    fontFlash(wealth, "green", "bold", function() {
        $('#continueAfterBills').show();
    });

}


function spendFirstIncome() {
    var continueAfterBills = document.getElementById('continueAfterBills');
    continueAfterBills.setAttribute('onclick', 'showButtons()');
    var gameUpdates = document.getElementById("gameUpdates");
    gameUpdates.innerHTML = "You receive 23 Francs in income this month";

    //createCustomAlert("You receive 23 Francs in income this month");
    myWealth = myWealth + 23;
    wealth.innerHTML = wealthRect + "<span style='background:#5481C1; padding:5px 8px 5px 8px;'>Wealth: " + myWealth + " Francs</span>" + wealthRect;
    fontFlash(wealth, "green", "bold", function() {
        $('#continueAfterBills').show();
    });


}

function payFirst() {
    createUniqueCode(function() {

        option = "pay first";
        jsonData["condition"] = option;

        createInitialDivs();
        firstPayments();

        var rollBall = document.getElementById('rollBall');

        rollBall.onclick = function() {
            RollBall();
        }

        var nextRound = document.getElementById('nextRound');
        nextRound.onclick = function() {
            NextRound(true);
        }
    });
}

function spendFirst() {
    createUniqueCode(function() {

        option = "spend first";
        jsonData["condition"] = option;

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
    });
}

function createUniqueCode(callback) {
    var code = document.getElementById("uniqueCode");
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.id = "uniqueCodeID";
    var button = document.createElement("input");
    button.id="uniquecodebutton";
    button.setAttribute("type", "button");
    button.setAttribute("value", "Go");
    button.setAttribute("onclick", "getUniqueCode(" + callback + ")");
    code.appendChild(input);
    code.appendChild(button);

}

function getUniqueCode(callback) {
    var button=document.getElementById("uniquecodebutton");
    var input = document.getElementById("uniqueCodeID");
    var uniqueCode = input.value;
    console.log("Unique code: " + uniqueCode);
    //record the code
    jsonData["unique_code"] = uniqueCode;

    if (uniqueCode) {
        button.disabled=true;

        callback();
    }

}

function drawPins() { //currently just circles
    var gameGUI = document.getElementById("gameGUI");
    if (document.getElementById("pins") == null) {
        var pins = document.createElement("div");
        pins.id = "pins";
        gameGUI.appendChild(pins);
        var pinsRow1 = document.createElement("div");
        pinsRow1.id = "pinsRow1";
        var pinsRow2 = document.createElement("div");
        pinsRow2.id = "pinsRow2";
        pins.appendChild(pinsRow1);
        pins.appendChild(pinsRow2);
    } else {
        var pinsRow1 = document.getElementById("pinsRow1");
        var pinsRow2 = document.getElementById("pinsRow2");
    }

    for (var i = 0; i < 5; i++) {
        var bowlingPin = document.createElement("img");
        bowlingPin.src = "bowling_pin_solid.png";
        bowlingPin.style = "width:25px;height:60px";
        bowlingPin.id = "bowlingPin_" + i.toString();
        bowlingPin.className = "bowlingPins";

        pinsRow1.appendChild(bowlingPin);
    }

    for (var j = 0; j < 5; j++) {
        var bowlingPin = document.createElement("img");
        bowlingPin.src = "bowling_pin_solid.png";
        bowlingPin.style = "width:25px;height:60px";
        bowlingPin.id = "bowlingPin_" + (j + 5).toString();
        bowlingPin.className = "bowlingPins";

        pinsRow2.appendChild(bowlingPin);
    }

}


function RollBall() {
    console.log("jsonData in throwball function:");
    console.log(jsonData);
    var timeHit = timestamp();
    //hide and disable the button
    $('#rollBall').hide();
    $('#nextRound').hide();

    var gameUpdates = document.getElementById("gameUpdates");
    if (myWealth <= -15) {
        //createCustomAlert("DEBT CAN'T BE MORE THAN 15 FRANCS. Please proceed to next round");
        gameUpdates.innerHTML = "DEBT CAN'T BE MORE THAN 15 FRANCS. Please proceed to next round";

        //can't proceed to roll again
        return;

    }


    //update balls left
    myWealth = myWealth - 1;
    fontFlash(wealth, 'darkblue', 'bold', function() {
        wealth.innerHTML = wealthRect + "<span style='background:#5481C1; padding:5px 8px 5px 8px;'>Wealth: " + myWealth.toString() + " Francs</span>" + wealthRect;
        fontFlash(wealth, 'red', 'bold');
    });

    generatePinsKnockedDown(totalPins);
    //record data
    //record data
    if (jsonData["game_" + currentMonth]["round_" + (10 - totalRounds).toString()] == null) {
        jsonData["game_" + currentMonth]["round_" + (10 - totalRounds).toString()] = [];
    }

    console.log('jsonData["game_" + currentMonth]["round_" + (10 - totalRounds).toString()]:');
    console.log(jsonData["game_" + currentMonth]["round_" + (10 - totalRounds).toString()]);
    console.log('jsonData["game_" + currentMonth]:');
    console.log(jsonData["game_" + currentMonth]);

    console.log({"time": timeHit,
        "choice": "roll",
        "wealth_francs": myWealth,
        "money_dollars": totalScore});

    jsonData["game_" + currentMonth]["round_" + (10 - totalRounds).toString()] = jsonData["game_" + currentMonth]["round_" + (10 - totalRounds).toString()].push({
        "time": timeHit,
        "choice": "roll",
        "wealth_francs": myWealth,
        "money_dollars": totalScore
    });

}

/**
 * returns an array of integers of the starting to ending pins (as pin ids are labeled by number)
 * so all the pins in this array need to be knocked down in the blink function
 */
function createList(start, end, start1, end1, callback) {
    console.log("Start: " + start.toString());
    console.log("End: " + end.toString());

    console.log("Start1: " + start1.toString());
    console.log("End1: " + end1.toString());
    var ints = [];
    for (var i = start; i < end; i++) {
        //console.log(i);
        ints.push(i);
    }

    if (start1 != 0 && end1 !== 0) {
        for (var j = start1; j < end1; j++) {
            console.log(j);
            ints.push(j);
        }
    }
    console.log(ints);
    callback(ints);
}

var allpins = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
/**
 * creates blinks such that it blinks all the pins at once, that takes a pin away and blinks that until
 * it goes through all the options
 */
function blink(start, end, start1 = 0, end1 = 0, callback = function() {}) {
    createList(start, end, start1, end1, function(ints) {
        var interval = setInterval(function() {
            if (ints.length == 0) {
                clearInterval(interval);
                setTimeout(function() {
                    callback();
                }, 50);
            }

            for (var i = 0; i < allpins.length; i++) {
                document.getElementById("bowlingPin_" + allpins[i].toString()).style.visibility = 'hidden';
            }
            setTimeout(function() {

                for (var i = 0; i < ints.length; i++) {
                    document.getElementById("bowlingPin_" + ints[i].toString()).style.visibility = 'visible';
                }
            }, 150);

            ints.pop();
        }, 300);
    })
}


function flashPins(pinsLeft, callback) {
    console.log("flashing pins");
    //drawPins();
    if (pinsLeft > 5 && pinsLeft != 10) {
        //console.log("Pins left greater than 5");
        blink(10 - pinsLeft, 5, 5, 10, function() {
            callback();
        });
    } else if (pinsLeft < 5) {
        // console.log("Pins left less than 5");
        blink(10 - pinsLeft, 10, 0, 0, function() {
            callback();
        });
    } else if (pinsLeft == 5) {
        blink(5, 10, 0, 0, function() {
            callback();
        });
    } else if (pinsLeft == 10) {
        blink(0, 10, 0, 0, function() {
            //console.log("IN CALLBACK IN FLASHPINS");
            callback();
        });
    }
}

function generatePinsKnockedDown(pinsLeft) {
    var gameUpdates = document.getElementById("gameUpdates");

    flashPins(pinsLeft, function() {
        //console.log("IN CALLBACK");
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
            gameUpdates.innerHTML = "You've knocked down all the pins, please proceed to the next round";
        }

        //show/renable buttons
        setTimeout(function() {
            $('#rollBall').show();
            $('#nextRound').show();
            $('#gameUpdates').html("");
        }, 250);
    });

}
var gameUpdates;

function NextRound(payFirst) {
    var timeHit = timestamp();

    $('#rollBall').hide();
    $('#nextRound').hide();

    var gameUpdates = document.getElementById("gameUpdates");
    totalRounds = totalRounds - 1;
    totalPins = 10; //reset total number of pins

    //record data
    if (jsonData["game_" + currentMonth]["round_" + (10 - totalRounds).toString()] == null) {
        jsonData["game_" + currentMonth]["round_" + (10 - totalRounds).toString()] = [];
    }

    console.log('jsonData["game_"' + currentMonth+']["round_"' + (10 - totalRounds).toString()+']:');
    console.log(jsonData["game_" + currentMonth]["round_" + (10 - totalRounds).toString()]);

    jsonData["game_" + currentMonth]["round_" + (10 - totalRounds).toString()] = jsonData["game_" + currentMonth]["round_" + (10 - totalRounds).toString()].push({
        "time": timeHit,
        "choice": "next",
        "wealth_francs": myWealth,
        "money_dollars": totalScore
    });

    //reset GUI
    circlePositions = [];
    for (var i = 0; i < 10; i++) {
        circlePositions.push(i);
    }

    document.getElementById("pins").remove();
    drawPins();
    //var roundsLeft = document.getElementById("RoundsLeft");
    //roundsLeft.innerHTML = "Rounds Left: " + totalRounds.toString();

    //set current day
    currDay = 1;
    currDayString = dayBorder('#C3D0DC', currDay.toString());
    for (var j = 1; j <= 10; j++) {
        if (j == 10 - totalRounds) {
            currDay = currDay + 3;
            var tempString = dayBorder('#5481C1', currDay.toString());
        } else {
            currDay = currDay + 3;
            var tempString = dayBorder('#C3D0DC', currDay.toString());
        }

        currDayString = currDayString + rectangle + tempString;
    }

    $('#day').html(currDayString);

    if (totalRounds != 0) {
        setTimeout(function() {
            $('#rollBall').show();
            $('#nextRound').show();
        }, 250);
    } else {
        $('#pins').hide();
        //out of rounds for the month
        if (payFirst) {
            //createCustomAlert("You have reached 10 games. The month is now over");
            gameUpdates.innerHTML = "You have reached 10 games. The month is now over";
            console.log("MONTHLY UPDATE")
            console.log(myWealth);

            currentMonth = currentMonth + 1;

        } else if (!payFirst) { //spend first option
            console.log("Spend first");
            //createCustomAlert('You pay 8 Francs for your bowling membership bill');
            gameUpdates.innerHTML = 'You pay 8 Francs for your bowling membership bill';
            myWealth = myWealth - 8;
            wealth.innerHTML = wealthRect + "<span style='background:#5481C1; padding:5px 8px 5px 8px;'>Wealth: " + myWealth + " Francs</span>" + wealthRect;
            fontFlash(wealth, "red", "bold", function() {
                //createCustomAlert("You have reached 10 games. The month is now over");
                gameUpdates.innerHTML = "You have reached 10 games. The month is now over";
                console.log("MONTHLY UPDATE")
                console.log(myWealth);
                //monthlyUpdate(currentMonth, myWealth);

                currentMonth = currentMonth + 1;

            });
        }
    }

    if (totalRounds == 0) {

        NextMonthButton();
        $("#nextMonth").click(function() {
            //reset to months
            totalRounds = 10;


            currDay = 1;
            currDayString = dayBorder('#C3D0DC', currDay.toString());
            for (var j = 1; j <= 10; j++) {
                if (j == 10 - totalRounds) {
                    currDay = currDay + 3;
                    var tempString = dayBorder('#5481C1', currDay.toString());
                } else {
                    currDay = currDay + 3;
                    var tempString = dayBorder('#C3D0DC', currDay.toString());
                }

                currDayString = currDayString + rectangle + tempString;
            }

            $('#day').html(currDayString);


            var current_month = document.getElementById("month");

            console.log(currentMonth);
            if (currentMonth == 1) {
                jsonData["game_1"] = {};
                monthlyWealth[timestamp()] = myWealth; //store the data
                moneyEarned[timestamp()] = totalScore;
                console.log(monthlyWealth);
                console.log(moneyEarned);
                //moneyEarned.push(totalScore);
                //monthlyUpdate(currentMonth, myWealth); //NOT WORKING?

                current_month.innerHTML = "<span style='background:#C3D0DC;'>SEPT</span> <span style='background:#5481C1;'>OCT</span> <span style='background:#C3D0DC;'>NOV</span> <span style='background:#C3D0DC;'>DEC</span>";
                console.log("Month string: " + current_month.innerHTML);
                if (payFirst) {
                    console.log("pay first!");
                    firstPayments();
                } else {
                    console.log("spend first");
                    spendFirstIncome();
                }
            } else if (currentMonth == 2) {
                jsonData["game_2"] = {};
                monthlyWealth[timestamp()] = myWealth;
                moneyEarned[timestamp()] = totalScore;
                console.log(monthlyWealth);
                console.log(moneyEarned);

                current_month.innerHTML = "<span style='background:#C3D0DC;'>SEPT</span> <span style='background:#C3D0DC;'>OCT</span> <span style='background:#5481C1;'>NOV</span> <span style='background:#C3D0DC;'>DEC</span>";
                if (payFirst) {
                    firstPayments();
                } else {
                    spendFirstIncome();
                };
            } else if (currentMonth == 3) {
                jsonData["game_3"] = {};
                monthlyWealth[timestamp()] = myWealth;
                moneyEarned[timestamp()] = totalScore;
                console.log(monthlyWealth);
                console.log(moneyEarned);

                current_month.innerHTML = "<span style='background:#C3D0DC;'>SEPT</span> <span style='background:#C3D0DC;'>OCT</span> <span style='background:#C3D0DC;'>NOV</span> <span style='background:#5481C1;'>DEC</span>";
                if (payFirst) {
                    firstPayments();
                } else {
                    spendFirstIncome();
                };
            } else if (currentMonth >= 4) {
                //createCustomAlert("GAME OVER");
                gameUpdates.innerHTML = "<b>GAME OVER</b>";
                monthlyWealth[timestamp()] = myWealth;
                moneyEarned[timestamp()] = totalScore;
                console.log(monthlyWealth);
                console.log(moneyEarned);

                var endWealth = {
                    "monthlyWealth": monthlyWealth
                };
                var endEarned = {
                    "moneyEarned": moneyEarned
                };



                //var data = [option, endWealth, endEarned];
                $.ajax({
                    type: 'GET', // added,
                    url: '/sendDataToBackend',
                    data: JSON.stringify(jsonData),
                    contentType: "application/json; charset=utf-8",
                    //jsonpCallback: 'callback' - removed
                    success: function(data) {
                        console.log("success on client side");
                    }
                });

                killGame();
                //getData();

            }

            //reset total balls and rounds
            totalBalls = 15;

            $("#nextMonth").remove();

            setTimeout(function() {
                $('#pins').show();
            }, 1700);


        });

    }
}



function updateTotalScore(knockedDown) {
    totalScore = totalScore + knockedDown;
    var score = document.getElementById("TotalScore");
    score.innerHTML = "Money earned: " + format2(totalScore / 100.0, "$");
    fontFlash(score, 'green', 'bold');
}


function updateGUI(pinsLeft) {

    var gameGUI = document.getElementById("gameGUI");
    $("#pinsRow1").empty();
    $("#pinsRow2").empty();
    var pinsRow1 = document.getElementById("pinsRow1");
    //pinsRow1.innerHTML="";
    var pinsRow2 = document.getElementById("pinsRow2");
    //pinsRow2.innerHTML="";

    //create all the pin divs and their ids
    for (var a = 0; a < 5; a++) {
        var bowlingPin = document.createElement("img");
        bowlingPin.style = "width:25px;height:60px";
        bowlingPin.id = "bowlingPin_" + a.toString();
        bowlingPin.className = "bowlingPins";
        pinsRow1.appendChild(bowlingPin);
    }

    for (var b = 0; b < 5; b++) {
        var bowlingPin = document.createElement("img");
        bowlingPin.style = "width:25px;height:60px";
        bowlingPin.id = "bowlingPin_" + (b + 5).toString();
        bowlingPin.className = "bowlingPins";
        pinsRow2.appendChild(bowlingPin);
    }

    if (pinsLeft >= 5) {
        var knockedOver = 10 - pinsLeft;

        //if number of knocked down pins is less than 5
        for (var j = knockedOver; j < 5; j++) {
            var bowlingPin = document.getElementById('bowlingPin_' + j.toString());
            bowlingPin.src = "bowling_pin_solid.png";
        }

        for (var k = 5; k < 10; k++) {
            var bowlingPin = document.getElementById('bowlingPin_' + k.toString());
            bowlingPin.src = "bowling_pin_solid.png";
            //bowlingPin.style = "width:25px;height:60px";
            //bowlingPin.id = "bowlingPin_" + k.toString();
            //bowlingPin.className = "bowlingPins";
            //pinsRow1.appendChild(bowlingPin);
        }

        //knocked down pins
        for (var i = 0; i < knockedOver; i++) {
            var bowlingPinGrey = document.getElementById("bowlingPin_" + i.toString());
            bowlingPinGrey.src = "bowling_pin_transparent.png";
            //bowlingPinGrey.style = "width:25px;height:60px";
            //bowlingPinGrey.id = "bowlingPin_" + (pinsLeft - 5 + i).toString();
            //bowlingPinGrey.className = "bowlingPins";

            //pinsRow1.appendChild(bowlingPinGrey);
        }

    } else { //if number of pinsleft is less than 5, knocked over pins greater than 5
        var knockedOver = 10 - pinsLeft;
        for (var i = 0; i < 5; i++) {
            var bowlingPinGrey = document.getElementById("bowlingPin_" + i.toString());
            bowlingPinGrey.src = "bowling_pin_transparent.png";
            /*bowlingPinGrey.style = "width:25px;height:60px";
            bowlingPinGrey.id = "bowlingPin_" + i.toString();
            bowlingPinGrey.className = "bowlingPins";
            pinsRow1.appendChild(bowlingPinGrey);
            */
        }

        for (var j = 5; j < knockedOver; j++) {
            //console.log("bowlingPin_" + j.toString());
            var bowlingPinGrey = document.getElementById("bowlingPin_" + j.toString());
            bowlingPinGrey.src = "bowling_pin_transparent.png";
            /*bowlingPinGrey.style = "width:25px;height:60px";
            bowlingPinGrey.id = "bowlingPin_" + (x + 5).toString();
            bowlingPinGrey.className = "bowlingPins";
            pinsRow2.appendChild(bowlingPinGrey);*/
        }

        for (var k = knockedOver; k < 10; k++) {
            var bowlingPin = document.getElementById("bowlingPin_" + k.toString());
            bowlingPin.src = "bowling_pin_solid.png";
            /*bowlingPin.style = "width:25px;height:60px";
            bowlingPin.id = "bowlingPin_" + (k + knockedOver).toString();
            bowlingPin.className = "bowlingPins";

            pinsRow2.appendChild(bowlingPin);*/
        }
    }
}



//--------------------------------------------------
function NextMonthButton() {
    var nextMonth = document.createElement("button");
    nextMonth.id = "nextMonth";
    nextMonth.className = "btn";
    nextMonth.innerHTML = "Next month";
    $("#gameButtons").append(nextMonth);
}

function createInitialDivs() {
    var game = document.getElementById("game");
    var upperStuff = document.getElementById("upperStuff");

    var updateArea = document.createElement("div");
    updateArea.id = "updateArea";
    upperStuff.appendChild(updateArea);

    var month = document.createElement("div");
    month.id = "month";
    month.innerHTML = "<span style='background:#5481C1;'>SEPT</span> <span style='background:#C3D0DC;'>OCT</span> <span style='background:#C3D0DC;'>NOV</span> <span style='background:#C3D0DC;'>DEC</span>";
    updateArea.appendChild(month);

    var day = document.createElement("div");
    day.id = "day";
    day.innerHTML = currDayString;
    updateArea.appendChild(day);

    wealth = document.createElement("div");
    wealth.id = "wealth";
    wealth.innerHTML = "Wealth: ";
    updateArea.appendChild(wealth);

    var middleStuff = document.createElement("div");
    middleStuff.id = "middleStuff"
    game.appendChild(middleStuff);

    var gameUpdates = document.createElement("div");
    gameUpdates.id = "gameUpdates";
    middleStuff.appendChild(gameUpdates);

    var roundsleft = document.createElement("div");
    roundsleft.id = "RoundsLeft";
    middleStuff.appendChild(roundsleft);

    var ballsleft = document.createElement("div");
    ballsleft.id = "BallsLeft";
    middleStuff.appendChild(ballsleft);

    var gameButtons = document.createElement("div")
    gameButtons.id = "gameButtons";
    middleStuff.appendChild(gameButtons)

    var rollBall = document.createElement("button");
    rollBall.id = "rollBall";
    rollBall.className = "btn";
    rollBall.innerHTML = 'Throw ball'
    gameButtons.appendChild(rollBall);

    var nextRound = document.createElement("button");
    nextRound.id = "nextRound";
    nextRound.className = "btn";
    nextRound.innerHTML = "Play another day";
    gameButtons.appendChild(nextRound);

    var continueAfterBills = document.createElement("button");
    continueAfterBills.id = "continueAfterBills";
    continueAfterBills.className = "btn";
    continueAfterBills.innerHTML = "Continue";
    gameButtons.appendChild(continueAfterBills);

    var totalScore = document.createElement("div");
    totalScore.id = "TotalScore";
    totalScore.innerHTML = "Money earned: ";
    game.appendChild(totalScore);

    $('#rollBall').hide();
    $('#nextRound').hide();
    $('#continueAfterBills').hide();

}

function killGame() {
    $(":button").on('click', function() {
        $(this).prop("disabled", true);
    })
}
/*------------------Write results---------------------*/
function createFile(text) {

    var hiddenElement = document.createElement('a');

    hiddenElement.href = 'data:attachment/text,' + encodeURI(text);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'bowlingInfo.txt';
    hiddenElement.click();

}

function writeEmail() {
    var addresses = "spothorse9.lucy@gmail.com"; //between the speech mark goes the receptient. Seperate addresses with a ;
    var body = option + ":" + JSON.stringify(monthlyWealth) + JSON.stringify(moneyEarned) //write the message text between the speech marks or put a variable in the place of the speech marks
    var subject = "Bowling game results" //between the speech marks goes the subject of the message
    var href = "mailto:" + addresses + "?" + "subject=" + subject + "&" + "body=" + body;
    var wndMail;
    wndMail = window.open(href, "_blank", "scrollbars=yes,resizable=yes,width=10,height=10");
    if (wndMail) {
        wndMail.close();
    }
}

function testEmail() {
    var addresses = "spothorse9.lucy@gmail.com"; //between the speech mark goes the receptient. Seperate addresses with a ;
    var body = "HIHIHI" //write the message text between the speech marks or put a variable in the place of the speech marks
    var subject = "Bowling game results" //between the speech marks goes the subject of the message
    var href = "mailto:" + addresses + "?" + "subject=" + subject + "&" + "body=" + body;
    var wndMail;
    wndMail = window.open(href, "_blank", "scrollbars=yes,resizable=yes,width=10,height=10");
    console.log("in testing email");
    if (wndMail) {
        wndMail.close();
    }
}

//testEmail();
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

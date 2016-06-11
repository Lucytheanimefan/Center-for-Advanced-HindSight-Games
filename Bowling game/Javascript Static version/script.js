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
            }else{
                return (d-5)*20+margin.left;
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
var drawGraph = function(){

	//number of circles to color in to visualize percent
	var percentNumber = 3000;

    var randomBox = generateRandom(3000)

    console.log(randomBox)

	//variables for the colors
	var noneFill = "transparent";
	var fill = "#ffffff";

	//width and height of the SVG
	const width = 2500;
	const height = 1280;

	//create an svg with width and height
	var svg = d3.select('#health-food-stage2')
		.append('svg')
        .attr("class","pixels-graph")
		.attr("width", width)
		.attr("height", height)
        .attr("transform", "translate(-530,80)");

	//10 rows and 10 columns 
	var numRows = 64;
	var numCols = 125;

	//x and y axis scales
	var y = d3.scaleBand()
		.range([0,1280])
		.domain(d3.range(numRows));

	var x = d3.scaleBand()
		.range([0, 2500])
		.domain(d3.range(numCols));

	//the data is just an array of numbers for each cell in the grid
	var data = d3.range(numCols*numRows);

	//container to hold the grid
	var container = svg.append("g")
		.attr("transform", "translate(0,0)");
	

	container.selectAll("rects")
			.data(data)
			.enter().append("rect")
			.attr("id", function(d){return "id"+d;})
			.attr('x', function(d){return x(d%numCols);})
			.attr('y', function(d){return y(Math.floor(d/numCols));})
			.attr('width', 20)
            .attr('height',20)
			// .attr('fill', function(d){return d < percentNumber ? twitterFillActive : twitterFill;})
            .attr('fill', function(d){return randomBox.includes(d) ? fill : noneFill;})

}

	//call function to draw the graph
	drawGraph();

// function generateRandom(num){
//     var result = []
//     for(var i = 0; i < num; i++){
//         result.push(Math.floor(Math.random()*8000))
//     }
//     return result
// }

function generateRandom(num) {
    let results = []

    while (results.length < num) {
        let randomNumber = Math.floor(Math.random()*8000)
        if(!results.includes(randomNumber)){
            results.push(randomNumber)
        }
    }

    return results
}
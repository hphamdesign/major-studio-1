var drawGraph = d3.csv('https://raw.githubusercontent.com/hphamdesign/Data-Visualization/Project-2/data/AUD_legalAge2.csv').then(function(data){
	// Create a node list to store the positions of bottles
	let list = [];

	// Add a scale for bottle color
	var myColor = d3
	.scaleOrdinal()
	.domain(["Prohibited","21","20","19","18","17","16","14","None"])
	.range(["#e81e63","#ff7621","#cddc39","#009688","#673ab7","#9c27b0","#3f51b5","#03a9f4","#ffffff"]);
	
	// Add a scale for rotation angle
	let gridAngles = d3
	.scaleLinear()
	.domain([0.3,21.2])
	.range([0,90])

	let gridTransform = d3
	.scaleLinear()
	.domain([0.3,21.2])
	.range(["0,0","50,30"])

	const width = innerWidth;
	const height = 1400;

	//create an svg with width and height
	var svg = d3.select('#my_dataviz')
		.append('svg')
		.attr("width", width)
		.attr("height", height)

    /* 
    	this is the icon path definition that we are using instead of circles.
    	the path data can be copied and pasted from an SVG icon file.
    */

	var bottles = svg.append("defs")
		.append("g")
		.attr("id","bottleIcon")

	bottles
		.append("path")
		.attr("d","M62.444 0C56.6391 0 51.6664 4.1552 50.635 9.86781L47 30H55V130L17.3327 173.024C6.15924 185.786 0 202.171 0 219.134V521.204C0 534.346 11.1929 545 25 545H135C148.807 545 160 534.346 160 521.204V219.134C160 202.171 153.841 185.786 142.667 173.024L105 130V30H112L108.365 9.86781C107.334 4.15521 102.361 0 96.556 0H62.444Z")
		.attr("transform", "translate(0,0) scale(.16)");
		

	//end path definition

	//11 rows and 23 columns 
	var numRows = 10;
	var numCols = 24;

	//x and y axis scales
	var y = d3.scaleBand()
		.range([0,1370])
		.domain(d3.range(numRows));

	var x = d3.scaleBand()
		.range([0, 2750])
		.domain(d3.range(numCols));

	//the data is just an array of numbers for each cell in the grid
	grid = d3.range(numCols*numRows);
	
	//container to hold the grid
	var container = svg.append("g")
		.attr("transform", "translate(85,60)");
	
	container.selectAll("circle")
			.data(grid)
			.enter().append("circle")
			// .attr('class','thumbnail')
			.attr("id", function(d){return "id"+d;})
			.attr('cx', function(d){return x(d%numCols);})
			.attr('cy', function(d){return y(Math.floor(d/numCols));})
			.attr('r', 4)
			.attr('visibility', 'hidden')

	let circles = document.querySelectorAll("circle");
		console.log(circles);
	
	for (let i = 0; i < circles.length; i++) {
		list[i] = [
			+document.querySelectorAll(`circle`)[i].attributes.cx.value,
			+document.querySelectorAll(`circle`)[i].attributes.cy.value,
			];
		}
			console.log(list);

	// Create a div for mouseover effect
	var div = d3.select("body").append("div")
		.attr("class", "tooltip")
		.style("opacity", 0);

	container.selectAll("use")
		.data(data)
		.enter()
		.append("use")
		.attr("xlink:href", "#bottleIcon")
		.attr("class","thumbnail")
		.attr("id", function (d) {return d.LegalAge;})
		.attr("x", function (d,i) {return list[i][0];})
		.attr("y", function (d,i) {return list[i][1];})
		.style("fill", function (d) {return myColor(d.LegalAge);})
		.attr("transform", function (d) {
			var xRot = d3.select(this).attr("x");
			var yRot = d3.select(this).attr("y");
			function rotation() {
				return gridAngles(d.AUD);
			}
			function transform(){
				return gridTransform(d.AUD);
			}
		return `translate(${transform()})rotate(${rotation()}, ${xRot},  ${yRot /*ES6 template literal to set x and y rotation points*/})` 
		})
		.style("stroke", "black")
		.on('mouseover', function (event, d) {
			d3.select(this).transition()
				 .duration('50')
				 .attr('opacity', '.85');
			//Makes the new div appear on hover:
			div.transition()
				 .duration(50)
				 .style("opacity", 1);
			div.html("<font size = +2>" + "<b>"+ d.GeoAreaName.toUpperCase() +"</b>"+"</font>" + "<br>" + "Legal drinking age: " + d.LegalAge + "<br>" + "AUD%: " + d.AUD + "%")
				.style("left", (event.pageX) + "px")
				.style("top", (event.pageY - 10) + "px");		
	   })
	   .on('mouseout', function (d, i) {
			d3.select(this).transition()
				 .duration('50')
				 .attr('opacity', 1);
			//Makes the new div disappear:
			div.transition()
				 .duration('50')
				 .style("opacity", 0);
	   });
})




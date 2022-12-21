// select the svg area
var svg2 = d3.select("#myLegend")

// create a list of keys
var keys = ["Illegal","21","20","19","18","17","16","14","None"]
var n = keys.length
var itemWidth = 100;
var itemHeight = 20;

// var color = d3.scaleOrdinal()
//   .range(["#FF544B", "#FF9454", "#FFE167", "#CD76FB", "#8BDFFC"])
 var color = d3.scaleOrdinal()
  .range(["#e81e63","#ff7621","#cddc39","#009688","#673ab7","#9c27b0","#3f51b5","#03a9f4","#ffffff"])
  
var legend = svg2.selectAll(".legend")
	.data(keys)
	.enter()
	.append("g")
	.attr("transform", function(d,i) { return "translate(" + i%n * itemWidth + "," + Math.floor(i/n) * itemHeight + ")"; })
	.attr("class","legend");
	
var rects = legend.append('rect')
	.attr("width",45)
	.attr("height",45)
	.attr("fill", function(d,i) { return color(i); })

	
var text = legend.append('text')
	.attr("x",0)
	.attr("y",90)
	.text(function(d) { return d; })
	.attr("fill",function(d,i) { return color(i);})
	.attr("text-align","center")
    .attr("font-size","20px");

// Create legend for AUD%
// select the svg area
var svgIcons = d3.select("#myLegendIcon")

var bottleLegend = svg2.append("defs")
    .append("g")
    .attr("id","bottleIconLegend");

bottleLegend
    .append("path")
    .attr("d","M62.444 0C56.6391 0 51.6664 4.1552 50.635 9.86781L47 30H55V130L17.3327 173.024C6.15924 185.786 0 202.171 0 219.134V521.204C0 534.346 11.1929 545 25 545H135C148.807 545 160 534.346 160 521.204V219.134C160 202.171 153.841 185.786 142.667 173.024L105 130V30H112L108.365 9.86781C107.334 4.15521 102.361 0 96.556 0H62.444Z")
    .attr("transform", "translate(0,0) scale(.1)");

// create a list of keys
var keys = ["Very High","High","Low","Very Low"]
var n = keys.length
var itemWidth = 100;
var itemHeight = 30;

// var color = d3.scaleOrdinal()
//   .range(["#FF544B", "#FF9454", "#FFE167", "#CD76FB", "#8BDFFC"])
 var colorIcon = d3.scaleOrdinal()
  .range(["lightgray","lightgray","lightgray","lightgray"])
 var colorText = d3.scaleOrdinal()
  .range(["whitesmoke","transparent","transparent","transparent"])
 var angles = d3.scaleOrdinal()
  .range(["rotate(0)","rotate(25)","rotate(60)","rotate(90)"])
  var trans = d3.scaleOrdinal()
  .range(["translate(0,0),","translate(0,1),","translate(0,16),","translate(0,42),"])

var legendIcon = svgIcons.selectAll(".legend")
	.data(keys)
	.enter()
	.append("g")
	.attr("transform", function(d,i) { return "translate(" + i%n * itemWidth + "," + Math.floor(i/n) * itemHeight + ")"; })
	.attr("class","legend");
	
var rects2 = legendIcon.append("use")
    .append("use")
    .attr("xlink:href", "#bottleIconLegend")
    .attr("x",0)
	.attr("y",0)
	.attr("width",50)
	.attr("height",50)
	.attr("fill", function(d,i) { return colorIcon(i); })
    .attr("transform", (i)=>{return trans(i) + angles(i);})
    // .attr("position","absolute")
    // .attr("bottom","0")

	
var text2 = legendIcon.append('text')
	.attr("x",0)
	.attr("y",90)
	.text("Tilt angle = Alcolic Use Disorder % (From Low to High)")
	.attr("fill",function(d,i) { return colorText(i);})
	.attr("text-align","center")
    .attr("font-size","18px");

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("info_btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
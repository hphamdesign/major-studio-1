/*global d3*/
/*global d*/
/*global mapboxgl*/
// select the svg area
var svg = d3.select("#my_dataviz")

// Handmade legend

//Circles 
svg.append("circle").attr("cx",40).attr("cy",50).attr("r", 30).style("fill","#33FF6D").style("stroke","green").style("opacity",".65")
svg.append("circle").attr("cx",40).attr("cy",150).attr("r", 18).style("fill","#33FF6D").style("stroke","green").style("opacity",".65")
svg.append("circle").attr("cx",40).attr("cy",235).attr("r", 12).style("fill","#33FF6D").style("stroke","green").style("opacity",".65")
svg.append("circle").attr("cx",40).attr("cy",305).attr("r", 8).style("fill","#33FF6D").style("stroke","green").style("opacity",".65")

//Very High 
svg.append("text").attr("x", 13).attr("y",95).text("Very High").style("font-size", ".75em").style("font-family", "futura").style("fill","#3F2F2E").attr("alignment-baseline","middle")
svg.append("text").attr("x", 25).attr("y",112).text(">75%").style("font-size", ".65em").style("font-family", "futura").style("fill","#897B74").attr("alignment-baseline","middle")

//High
svg.append("text").attr("x", 28).attr("y", 185).text("High").style("font-size", ".75em").style("font-family", "futura").style("fill","#3F2F2E").attr("alignment-baseline","middle")
svg.append("text").attr("x", 20).attr("y",203).text("51 - 70%").style("font-size", ".65em").style("font-family", "futura").style("fill","#897B74").attr("alignment-baseline","middle")

//Low
svg.append("text").attr("x", 29).attr("y", 260).text("Low").style("font-size", ".75em").style("font-family", "futura").style("fill","#3F2F2E").attr("alignment-baseline","middle")
svg.append("text").attr("x", 20).attr("y",275).text("25 - 50%").style("font-size", ".65em").style("font-family", "futura").style("fill","#897B74").attr("alignment-baseline","middle")

//Very Low
svg.append("text").attr("x", 18).attr("y", 325).text("Very Low").style("font-size", ".75em").style("font-family", "futura").style("fill","#3F2F2E").attr("alignment-baseline","middle")
svg.append("text").attr("x", 29).attr("y",342).text("<25%").style("font-size", ".65em").style("font-family", "futura").style("fill","#897B74").attr("alignment-baseline","middle")


// select the svg area
var svg2 = d3.select("#my_dataviz2")

// create a list of keys
var keys = ["Very High", "High", "Moderate", "Low", "Very Low"]
var n = keys.length
var itemWidth =70;
var itemHeight = 30;

// var color = d3.scaleOrdinal()
//   .range(["#FF544B", "#FF9454", "#FFE167", "#CD76FB", "#8BDFFC"])
 var color = d3.scaleOrdinal()
  .range(["#000000","#444444","#727272","#A8A8A8","#CECECE"])
  
var legend = svg2.selectAll(".legend")
	.data(keys)
	.enter()
	.append("g")
	.attr("transform", function(d,i) { return "translate(" + i%n * itemWidth + "," + Math.floor(i/n) * itemHeight + ")"; })
	.attr("class","legend");
	
var rects = legend.append('rect')
	.attr("width",70)
	.attr("height",25)
	.attr("fill", function(d,i) { return color(i); });

	
var text = legend.append('text')
	.attr("x", 10)
	.attr("y",40)
	.text(function(d) { return d; })
	.attr("fill","#3F2F2E")
	.attr("text-align","center");

//create map
mapboxgl.accessToken ="pk.eyJ1IjoiaHBoYW1kZXNpZ24iLCJhIjoiY2w4ZXdiYWx1MGo2NjQybnZxdmszdGJocyJ9.SiATpOA2TSEPPyiHhAN9Uw";

const map = new mapboxgl.Map({
  container: "map", // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/hphamdesign/cl8g3wxmx001815s39uo224h8", // style URL
  center: [10.128, 16.815], // starting position [lng, lat]
  zoom: 1.75, // starting zoom
});

let transform = d3.geoTransform({ point: projectPoint });
let path = d3.geoPath().projection(transform);

function projectPoint(lon, lat) {
  var point = map.project(new mapboxgl.LngLat(lon, lat));
  this.stream.point(point.x, point.y);
}

function polygonColor(d) {
  return d > 1000
    ? "#000000"
    : d > 750
    ? "#444444"
    : d > 500
    ? "#727272"
    : d > 250
    ? "#A8A8A8"
    : d > 100
    ? "#CECECE"
    : "gray";
}

function pointSize(d) {
  return d > 40 ? 35 : 3
}

let container = map.getCanvasContainer();
let SVG = d3
  .select(container)
  .append("svg")
  .attr("width", "100%")
  .attr("height", "2000")
  .style("position", "absolute")
  .style("z-index", 2);

let circleSvg = d3
  .select(container)
  .append("svg")
  .attr("width", "100%")
  .attr("height", "2000")
  .style("position", "absolute")
  .style("z-index", 3);

d3.json("https://raw.githubusercontent.com/CloudLun/Huong/main/data/mortality.geojson").then((d) => {
  console.log(d);

  let polygons = svg
    .selectAll("polygons")
    .data(d.features)
    .enter()
    .append("path")
    .attr("stroke", "white")
    .attr("stroke-width", 0.25)
    .attr("fill", (d) => polygonColor(d.properties["2017"]))
    .attr("fill-opacity", 1);

  function render() {
    polygons.attr("d", path);
  }

  render();
  map.on("viewreset", render);
  map.on("move", render);
  map.on("moveend", render);
});

d3.json("https://raw.githubusercontent.com/hphamdesign/Data-Visualization/Project-1/shpp.geojson").then((data) => {

  console.log(data)

    let points = circleSvg
    .selectAll("points")
    .data(data.features)
    .enter() 
    .append("path")
    .attr("d", path.pointRadius(d => pointSize(+d.properties
      .birth)))
    .attr('fill', '#33FF6D')
    .attr('stroke', 'green')
    .attr("fill-opacity", 0.4);

  function render() {
    points.attr('d', path)
  }

  render();
  map.on("viewreset", render);
  map.on("move", render);
  map.on("moveend", render);
});

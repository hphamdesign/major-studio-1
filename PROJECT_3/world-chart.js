d3.csv('https://raw.githubusercontent.com/hphamdesign/Data-Visualization/Project-3/data/data.csv').then(function (data) {
    console.log(data)

    // Create a node list to store the positions of bottles
    let list = [];

    const tooltip = d3.select('body').append('div').attr('class', 'tooltip')
    const width = innerWidth;
    const height = 1500;

    //create an svg with width and height
    var svg = d3.select("#world-graph")
        .append('svg')
        .attr("width", width)
        .attr("height", height)

    //12 rows and 18 columns 
    var numRows = 11;
    var numCols = 20;
    
    //x and y axis scales
    var y = d3.scaleBand()
        .range([0, 1300])
        .domain(d3.range(numRows));

    var x = d3.scaleBand()
        .range([0, 2600])
        .domain(d3.range(numCols));

    //the data is just an array of numbers for each cell in the grid
    grid = d3.range(numCols * numRows);

    //container to hold the grid
    var container = svg.append("g")
        .attr("transform", "translate(200,100)");

    container.selectAll("hiddenCircle")
        .data(grid)
        .enter().append("circle")
        .attr("id", function (d) { return "id" + d; })
        .attr('cx', function (d) { return x(d%numCols); })
        .attr('cy', function (d) { return y(Math.floor(d/numCols)); })
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
    // var div = d3.select("body").append("div")
    //     .attr("class", "tooltip")
    //     .style("opacity", 0);

    container.selectAll(".country")
        .data(data)
        .join("circle")
        .attr("class", "my-country")
        .attr("cx", function (d, i) { return list[i][0]; })
        .attr("cy", function (d, i) { return list[i][1]; })
        .attr("r", function (d) {
            if (d.$2020 === "NaN") {
                return 30
            }
            if (d.$2020 === "<2.5") {
                return 4
            }
            return d.$2020 * 1.5;
        })
        .style("fill", function (d) {
            if (d.$2020 === "NaN") {
                return "transparent"
            }
            if (d.$2020 > 40) {
                return "#F3D69D"
            }
            return "white"
        })
        .style("stroke", function (d) {
            if (d.$2020 === "NaN") {
                return "grey"
            }
            if (d.$2020 > 40) {
                return "#E5B24D"
            }
            return "black"
        })
        .style("stroke-width", function(d){
            if (d.$2020 > 40) {
                return "4px"
            }
            else {
                return "1px"
            }
        })
        .style("stroke-dasharray", function (d) {
            if (d.$2020 === "NaN") {
                return "8"
            }
            else {
                return "none"
            }
        })
        .on('mouseover', function (event, d) {
            let content =''

            if (d.$2020 === "NaN") {
                content =  `Data not available`
            } else { content = `<span id="world-country"> ${d.GeoAreaName} </span> <br> Percentage of population couldn’t afford a healthy diet <br> <span class=num>${d.$2020}% </span> `}
            
            tooltip.html(content)
                    .style('visibility', 'visible')
                    .style("left", (event.pageX) + "px")
                    .style("top", (event.pageY - 40) + "px");	
        })
        .on('mouseout', function (d, i) {
            tooltip.style('visibility','hidden')
        })
        .attr("class", "country");
})
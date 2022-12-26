d3.csv('https://raw.githubusercontent.com/hphamdesign/Data-Visualization/Project-3/data/data.csv').then(function(data){
    console.log(data)

    var modifiedData =[]
    let oneYearAllCountries = {year: 2020}

    data.forEach(d => {
        oneYearAllCountries[d.GeoAreaName] = d.$2020 == '<2.5' ? '2.5' : d.$2020
    })

    modifiedData.push(oneYearAllCountries)

    console.log(modifiedData)

    var country = "Afghanistan"

    d3.select("#selectButton")
        .selectAll('myOptions')
        .data(data.filter(d => d.$2020 != "NaN"))
        .enter()
        .append('option')
        .text(function (d) { return d.GeoAreaName; }) // text showed in the menu
        .attr("value", function (d) { return d.GeoAreaName; }) // corresponding value returned by the button

    //Header text
    var countryTitle = d3.select("#single-graph-header")
        .data(data)
        .append("text")
        .attr("x", "0").attr("y", 250)
        .attr("class","tittle")
        .text( d => `In 2020, In ${d.GeoAreaName}`)

    //Data
    var dataPoint = d3.select("#single-graph")
        .data(modifiedData)
        .append("text")
        .text( d => `${d[country]}% of the population was undernourished`)
        .attr("id","dataPoint")

    console.log(dataPoint)

    const width = innerWidth,
    height = 1000;

    var arcGen = d3.arc()
    .innerRadius(0)
    .outerRadius(360.5)
    .startAngle(0)
    .endAngle(function(d) {return (2*(d/100)*Math.PI)});

    // append the svg object to the div called 'my_dataviz'
    let arcs = d3.select("#single-graph")
        .data(modifiedData)
        .append("svg")
            .attr("width", width)
            .attr("height", height)
        .append("g")
            .attr("transform", `translate(${width/2}, ${height/2})`)
        .append("path")
        .attr("class","arc")
        .attr("d", function(d) {return arcGen(d[country])})
        .attr("fill","#E6E6E6")
    
    function update(dropdownValue){
        country = dropdownValue
        
        arcs
        .transition()
        .duration(200)
        .attr("d", function(d) {return arcGen(d[country])})

        arcs
        .exit()
        .remove()

        countryTitle
        .text(d => `In 2020, In ${country}`)

        dataPoint
        .text(d => `${d[country]}% of the population was undernourished`)
    }

     // When the button is changed, run the updateChart function
     d3.select("#selectButton").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(selectedOption)
    })

})
// select the svg area
var svg = d3.select("#tiktok-graph")

// Handmade legend
svg.append("text").attr("x", "70%").attr("y", 250).text("The hashtag #healthydiet has gained 350 million views on Tiktok ").attr("class","p3")

svg.append("circle").attr("cx","70.5%").attr("cy",284).attr("r", 10).style("fill", "#9CB600")
svg.append("text").attr("x","71.5%").attr("y", 290).text("1 dot = 100,000 views").attr("class","p4")

svg.append("text").attr("x", "70%").attr("y", 800).text("Source: The data was collected from Tiktok’s wesite as of November 21 2022 10:23 am ").attr("class","p4")

// select the svg area
var svg = d3.select("#tiktok-graph")

// Handmade legend
svg.append("text").attr("x", "68%").attr("y", 250).text("The #healthydiet has gained 350 million views on Tiktok ").attr("id","legend")

svg.append("text").attr("x","68%").attr("y", 290).text("1 dot = 100,000 views").attr("id","source")

svg.append("text").attr("x", "68%").attr("y", 800).text("Source: The data was collected from Tiktok’s wesite as of Nov 21 2022 ").attr("id","source")

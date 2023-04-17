// Define jobCountData as a global variable with an initial value of an empty array
let jobCountData = [];

// Set the dimensions and margins of the graph
const margin = { top: 20, right: 20, bottom: 50, left: 50 };
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// Create an SVG element and append it to the DOM
const svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);


// Define formattedDate as today's date in yyyy-mm-dd format
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const formattedDate = `${year}${month}${day}`;

// Load the data from the JSON file
Promise.all([
  d3.json("data/jobs_20230417.json"),
  d3.json("data/jobs_20230418.json"),
])
  .then(function (data) {
    data.forEach((jobs) => {
      let jobCount = jobs.filter((job) => job.position !== "").length;
      jobCountData.push({
        scrapedOn: new Date(jobs[0].scrapedOn),
        jobCount: jobCount,
      });
    });
    drawChart();
  })
  .catch((error) => console.error("Error loading JSON data:", error));



// Define the drawChart function
function drawChart() {
  const x = d3.scaleTime().domain(d3.extent(jobCountData, d => d.scrapedOn)).range([0, width]);
  const y = d3.scaleLinear().domain([0, d3.max(jobCountData, d => d.jobCount)]).nice().range([height, 0]);

  const line = d3.line()
    .x(d => x(d.scrapedOn))
    .y(d => y(d.jobCount));

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickValues(jobCountData.map(d => d.scrapedOn)).tickSizeOuter(0).tickFormat(d3.timeFormat("%Y-%m-%d")))
    .attr("font-size", "14px");

  svg.append("g")
    .call(d3.axisLeft(y))
    .attr("font-size", "14px");

  svg.append("path")
    .datum(jobCountData)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", line);

  svg.selectAll(".dot")
    .data(jobCountData)
    .enter().append("circle")
    .attr("class", "dot")
    .attr("cx", d => x(d.scrapedOn))
    .attr("cy", d => y(d.jobCount))
    .attr("r", 3.5)
    .style("fill", "steelblue");
}


// Format the data
jobCountData.forEach((d) => {
  d.scrapedOn = new Date(d.scrapedOn);
});

console.log("Formatted jobCountData: ", jobCountData);
 
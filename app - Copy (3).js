Promise.all([
  d3.json("data/jobs_20230417.json"),
  d3.json("data/jobs_20230418.json"),
  d3.json("data/jobs_20230419.json"),
])
  .then(function (data) {
    const chartData = [];
    const chartLayout = {
      xaxis: {
        title: "Date",
        tickformat: "%Y-%m-%d",
        type: "date",
      },
      yaxis: {
        title: "Job Count",
        range: [0, 100],
        tickmode: "linear",
        tick0: 0,
        dtick: 10,
      },
    };
    

    data.forEach((jobs) => {
      const jobCount = jobs.filter((job) => job.position !== "").length;
      const scrapedOn = new Date(jobs[0].scrapedOn);
      chartData.push({ x: scrapedOn, y: jobCount });
    });

    Plotly.newPlot("chart", [{ type: "scatter", mode: "lines", x: chartData.map(d => d.x), y: chartData.map(d => d.y) }], chartLayout);
  })
  .catch((error) => console.error("Error loading JSON data:", error));

const chartData = {
  labels: [],
  datasets: [
    {
      label: "Job Count",
      data: [],
      borderColor: "steelblue",
      pointRadius: 3,
      tension: 0.1,
      fill: false,
    },
  ],
};

Promise.all([
  d3.json("data/jobs_20230417.json"),
  d3.json("data/jobs_20230418.json"),
  d3.json("data/jobs_20230419.json"),
])
  .then(function (data) {
    data.forEach((jobs) => {
      let jobCount = jobs.filter((job) => job.position !== "").length;
      const scrapedOn = new Date(jobs[0].scrapedOn);
      chartData.labels.push(scrapedOn);
      chartData.datasets[0].data.push(jobCount);
    });
    drawChart();
  })
  .catch((error) => console.error("Error loading JSON data:", error));

  function drawChart() {
    const ctx = document.getElementById("chart").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "line",
      data: chartData,
      options: {
        layout: {
          padding: {
            left: 20, // adjust as needed
            right: 20, // adjust as needed
            top: 20, // adjust as needed
            bottom: 30 // adjust as needed
          }
        },
        scales: {
          x: {
            type: "time",
            time: {
              unit: "day",
              displayFormats: {
                day: "yyyy-MM-dd"
              },
              tooltipFormat: "yyyy-MM-dd",
              // Add offset to center ticks on data point
              offset: true
            },
            title: {
              display: true,
              text: "Date"
            },
            min: chartData.labels[0],
            max: chartData.labels[chartData.labels.length - 1],
            ticks: {
              source: "auto",
              autoSkip: true
            }
          },
          y: {
            title: {
              display: true,
              text: "Job Count"
            },
            suggestedMin: 0,
            suggestedMax: 100,
            stepSize: 10
          }
        }
      }
    });
  }
  
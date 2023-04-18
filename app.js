// Replace the following array with your actual JSON file names or URLs
async function fetchFileList() {
  const response = await fetch("./data/fileList.json");
  const fileList = await response.json();

  if (Array.isArray(fileList)) {
    return fileList;
  } else {
    console.error("Invalid data in fileList.json.");
    return [];
  }
}

async function fetchJobData(file) {
  const response = await fetch(file);
  const data = await response.json();
  return data;
}

async function countJobsPerDay(fileList) {
  const dailyJobCounts = [];

  for (const file of fileList) {
    const response = await fetch(`./data/${file}`);
    const jobs = await response.json();
    dailyJobCounts.push({ date: jobs[0].scrapedOn, count: jobs.length });
  }

  return dailyJobCounts;
}


async function createLineChart() {
  const fileList = await fetchFileList();
  console.log("Fetched fileList:", fileList); // Add this line for debugging

  const dailyJobCounts = await countJobsPerDay(fileList);
  console.log("Daily job counts:", dailyJobCounts); // Add this line for debugging

  const chartData = {
    labels: dailyJobCounts.map((item) => item.date),
    datasets: [
      {
        label: "Number of Jobs",
        data: dailyJobCounts.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  const ctx = document.getElementById("jobChart").getContext("2d");
  const jobChart = new Chart(ctx, {
    type: "line",
    data: chartData,
    options: chartOptions,
  });
}


createLineChart();
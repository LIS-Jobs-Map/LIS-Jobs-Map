let jobChart;

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

function aggregateCounts(dailyJobCounts, interval) {
  const aggregatedCounts = [];

  // Helper function to format date string
  function formatDate(date) {
    return date.toISOString().split("T")[0];
  }

  if (interval === "daily") {
    return dailyJobCounts;
  } else if (interval === "weekly" || interval === "monthly" || interval === "yearly") {
    let currentPeriodStartDate = new Date(dailyJobCounts[0].date);
    let currentPeriodJobCount = 0;
    let daysInCurrentPeriod = 0;

    if (interval === "weekly") {
      currentPeriodStartDate.setDate(currentPeriodStartDate.getDate() - currentPeriodStartDate.getDay());
    } else if (interval === "monthly") {
      currentPeriodStartDate.setDate(1);
    } else if (interval === "yearly") {
      currentPeriodStartDate.setMonth(0, 1);
    }

    for (const dailyCount of dailyJobCounts) {
      const date = new Date(dailyCount.date);

      if (interval === "weekly" && date.getDay() === 0) {
        aggregatedCounts.push({ date: formatDate(currentPeriodStartDate), count: currentPeriodJobCount / daysInCurrentPeriod });
        currentPeriodJobCount = 0;
        daysInCurrentPeriod = 0;
        currentPeriodStartDate.setDate(currentPeriodStartDate.getDate() + 7);
      } else if (interval === "monthly" && date.getDate() === 1) {
        aggregatedCounts.push({ date: formatDate(currentPeriodStartDate), count: currentPeriodJobCount / daysInCurrentPeriod });
        currentPeriodJobCount = 0;
        daysInCurrentPeriod = 0;
        currentPeriodStartDate.setMonth(currentPeriodStartDate.getMonth() + 1);
      } else if (interval === "yearly" && date.getMonth() === 0 && date.getDate() === 1) {
        aggregatedCounts.push({ date: formatDate(currentPeriodStartDate), count: currentPeriodJobCount / daysInCurrentPeriod });
        currentPeriodJobCount = 0;
        daysInCurrentPeriod = 0;
        currentPeriodStartDate.setFullYear(currentPeriodStartDate.getFullYear() + 1);
      }

      currentPeriodJobCount += dailyCount.count;
      daysInCurrentPeriod++;
    }

    // Add the last period
    aggregatedCounts.push({ date: formatDate(currentPeriodStartDate), count: currentPeriodJobCount / daysInCurrentPeriod });
  }

  return aggregatedCounts;
}


async function createLineChart(interval = "daily") {
  const fileList = await fetchFileList();
  console.log("Fetched fileList:", fileList);

  const dailyJobCounts = await countJobsPerDay(fileList);
  console.log("Daily job counts:", dailyJobCounts);

  const aggregatedCounts = aggregateCounts(dailyJobCounts, interval);
  console.log("Aggregated job counts:", aggregatedCounts);

  const chartData = {
    labels: aggregatedCounts.map((item) => item.date),
    datasets: [
      {
        label: "Number of Jobs",
        data: aggregatedCounts.map((item) => item.count),
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

  // Destroy previous chart instance if it exists
  if (jobChart) {
    jobChart.destroy();
  }

  // Create a new chart instance
  jobChart = new Chart(ctx, {
    type: "line",
    data: chartData,
    options: chartOptions,
  });
}

document.getElementById('intervalSelector').addEventListener('change', (event) => {
  const interval = event.target.value;
  createLineChart(interval);
});


createLineChart();
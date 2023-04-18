// Replace the following array with your actual JSON file names or URLs
async function fetchJsonFileList() {
  const response = await fetch("data/fileList.json");
  const files = await response.json();
  return files.map((file) => `data/${file}`);
}

async function fetchJobData(file) {
  const response = await fetch(file);
  const data = await response.json();
  return data;
}

async function countJobsPerDay() {
  const counts = [];

  for (const file of jsonFiles) {
    const data = await fetchJobData(file);
    const count = data.length;
    counts.push({ date: data[0].scrapedOn, count });
  }

  return counts;
}

async function createLineChart() {
  const jobCounts = await countJobsPerDay();

  const ctx = document.getElementById("jobChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: jobCounts.map((entry) => entry.date),
      datasets: [
        {
          label: "Number of Jobs",
          data: jobCounts.map((entry) => entry.count),
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 10,
          },
        },
      },
    },
  });
}

createLineChart();
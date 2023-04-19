const fs = require("fs");
const path = require("path");

// Add 'public' to the dataDir path
const dataDir = path.join(__dirname, "public", "data");

// Add 'public' to the fileListPath
const fileListPath = path.join(dataDir, "fileList.json");

fs.readdir(dataDir, (err, files) => {
  if (err) {
    console.error("Error reading data directory.");
    process.exit(1);
  } else {
    const jsonFiles = files.filter((file) => file.startsWith("jobs_") && file.endsWith(".json"));
    fs.writeFileSync(fileListPath, JSON.stringify(jsonFiles, null, 2));
  }
});

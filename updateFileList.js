const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "data");
const fileListPath = path.join(dataDir, "fileList.json");

fs.readdir(dataDir, (err, files) => {
  if (err) {
    console.error("Error reading data directory. Error:", err.message);
    process.exit(1);
  } else {
    const jsonFiles = files.filter((file) => file.startsWith("jobs_") && file.endsWith(".json"));
    fs.writeFileSync(fileListPath, JSON.stringify(jsonFiles, null, 2));
  }
});

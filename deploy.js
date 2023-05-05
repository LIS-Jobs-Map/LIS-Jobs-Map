const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs-extra");

// Check if the GITHUB_TOKEN is set
if (!process.env.GITHUB_TOKEN) {
  console.error("GITHUB_TOKEN not found in environment variables.");
  process.exit(1);
}

const buildDir = path.join(__dirname, "build");
const dataDir = path.join(__dirname, "data");

// Make sure the build directory exists
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir);
}

// Copy the data directory and its contents to the build directory
fs.copy(dataDir, path.join(buildDir, "data"), (err) => {
  if (err) {
    console.error("Error while copying data directory:", err.message);
    process.exit(1);
  }
});

// Copy the index.html file to the build directory
try {
  fs.copyFileSync(
    path.join(__dirname, "index.html"),
    path.join(buildDir, "index.html")
  );
} catch (err) {
  console.error("Error while copying index.html:", err.message);
  process.exit(1);
}

try {
  // Initialize a new Git repository in the build directory
  execSync("git init", { cwd: buildDir });

  // Configure Git in the build directory
  execSync(`git config user.name "GitHub Actions Bot"`, { cwd: buildDir });
  execSync(`git config user.email "actions@github.com"`, { cwd: buildDir });

  // Add, commit, and push the changes
  execSync("git add .", { cwd: buildDir });
  execSync('git commit -m "Deploy to GitHub Pages"', { cwd: buildDir });

  // Force push to the gh-pages branch
  execSync(
    `git push --force --quiet "https://${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git" main:gh-pages`,
    { cwd: buildDir }
  );

  console.log("Deployed successfully to GitHub Pages.");
} catch (error) {
  console.error("Error while deploying:", error.message);
  process.exit(1);
}

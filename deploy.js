const { execSync } = require('child_process');
const { GITHUB_TOKEN } = process.env;

if (!GITHUB_TOKEN) {
  console.error('GITHUB_TOKEN environment variable is not set');
  process.exit(1);
}

try {
  execSync('git config --local user.email "action@github.com"');
  execSync('git config --local user.name "GitHub Action"');

  // Check if the gh-pages branch exists and switch to it
  const branchExists = execSync('git branch --list gh-pages', { encoding: 'utf-8' }).trim().length > 0;
  if (branchExists) {
    console.log('gh-pages branch exists. Checking it out.');
    execSync('git checkout gh-pages');
  } else {
    console.log('gh-pages branch does not exist. Creating it as an orphan branch.');
    execSync('git checkout --orphan gh-pages');
  }

  execSync('git add .');
  execSync('git commit -m "Deploy to GitHub Pages"');
  execSync(`git push https://${GITHUB_TOKEN}@github.com/LIS-Jobs-Map/LIS-Jobs-Map.git gh-pages --force`);

  console.log('Successfully deployed to GitHub Pages');
} catch (error) {
  console.error('Failed to deploy to GitHub Pages:', error);
  process.exit(1);
}

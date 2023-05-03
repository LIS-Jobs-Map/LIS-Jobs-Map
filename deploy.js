const { execSync } = require('child_process');
const { GITHUB_TOKEN } = process.env;

if (!GITHUB_TOKEN) {
  console.error('GITHUB_TOKEN environment variable is not set');
  process.exit(1);
}

try {
  execSync('git config --local user.email "action@github.com"');
  execSync('git config --local user.name "GitHub Action"');
  execSync('git checkout --orphan gh-pages');
  execSync('git add .');
  execSync('git commit -m "Deploy to GitHub Pages"');
  execSync(`git push https://${GITHUB_TOKEN}@github.com/LIS-Jobs-Map/LIS-Jobs-Map.git gh-pages --force`);

  console.log('Successfully deployed to GitHub Pages');
} catch (error) {
  console.error('Failed to deploy to GitHub Pages:', error);
  process.exit(1);
}

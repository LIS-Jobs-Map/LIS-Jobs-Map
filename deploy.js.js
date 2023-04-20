const ghpages = require('gh-pages');
const { GITHUB_TOKEN } = process.env;

if (!GITHUB_TOKEN) {
  console.error('GITHUB_TOKEN environment variable is not set');
  process.exit(1);
}

ghpages.publish(
  'data',
  {
    branch: 'gh-pages',
    repo: `https://${GITHUB_TOKEN}@github.com/cmurgu/mapping-jobs.git`,
    user: {
      name: 'GitHub Action',
      email: 'action@github.com',
    },
  },
  (err) => {
    if (err) {
      console.error('Failed to deploy to GitHub Pages:', err);
      process.exit(1);
    } else {
      console.log('Successfully deployed to GitHub Pages');
    }
  }
);

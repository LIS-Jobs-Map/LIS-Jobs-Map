const ghpages = require('gh-pages');

ghpages.publish(
  'data',
  {
    branch: 'gh-pages',
    repo: 'https://github.com/cmurgu/mapping-jobs.git',
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

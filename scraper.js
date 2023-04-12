const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

(async () => {
  try {
    const response = await axios.get('https://partnershipjobs.ca/jobs?page=1');
    const $ = cheerio.load(response.data);
    const jobs = [];

    $('table > tbody > tr').each((index, element) => {
      const positionElement = $(element).find('td:nth-child(1)').find('a');
      const position = positionElement.text().trim();
      const url = 'https://partnershipjobs.ca' + positionElement.attr('href');
      const organization = $(element).find('td:nth-child(2)').text().trim();
      const location = $(element).find('td:nth-child(3)').text().trim();
      const opened = $(element).find('td:nth-child(4)').text().trim();
      const closes = $(element).find('td:nth-child(5)').text().trim();

      jobs.push({ position, url, organization, location, opened, closes });
    });

    fs.writeFileSync('jobs.json', JSON.stringify(jobs, null, 2));
    console.log('jobs.json file has been saved with the scraped data.');
  } catch (error) {
    console.error('Error while scraping:', error.message);
  }
})();

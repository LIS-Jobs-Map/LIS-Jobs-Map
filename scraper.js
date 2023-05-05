const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Helper function to sleep for a specified duration
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getJobDetails(url) {
  let salary = 'N/A';
  let jobDescription = '';

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const bodyHTML = $('body').html();
    const bodyTextWithoutTags = bodyHTML.replace(/<[^>]*>/g, '');
    jobDescription = bodyTextWithoutTags.replace(/\s\s+/g, ' ').trim();    
    const compensationText = $('body').text();

    const patterns = [
      /(compensation|salary|pay)[:\s]*\$?\s*(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/i,
      /(compensation|salary|pay)[:\s]*up to\s*(\d{1,3}(?:,\d{3})?)/i,
      /(compensation|salary|pay)[:\s]*(\d{2,3}\.\d{2}\s*-\s*\d{2,3}\.\d{2})/i,
      /(compensation|salary|pay)[:\s]*starting at\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*per hour/i,
      /(compensation|salary|pay)[:\s]*between\s*(\d{1,3}(?:,\d{3})?)\s*and\s*(\d{1,3}(?:,\d{3})?)/i
    ];

    let match = null;
    for (const pattern of patterns) {
      match = compensationText.match(pattern);
      if (match) {
        salary = match[2];
        break;
      }
    }

    if (match) {
      salary = salary.replace(/\$/, ''); // Remove the dollar sign from the salary value
      const hourlyPattern = /^(\d{1,3}(?:\.\d{2})?)$/;
      const hourlyMatch = salary.match(hourlyPattern);

      if (hourlyMatch) {
        const hourlyRate = parseFloat(hourlyMatch[1]);
        const annualSalary = hourlyRate * 40 * 52;
        salary = `$${annualSalary.toFixed(2)}`;
      } else {
        salary = `$${salary}`;
      }
    }
  } catch (error) {
    console.error(`Error while fetching job details for URL: ${url}`);
  }

  return {
    salary: salary,
    jobDescription: jobDescription,
  };
}


function getTimestampedFilename() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const timestampedFilename = `jobs_${year}${month}${day}.json`;

  return path.join('data', timestampedFilename);
}

(async () => {
  try {
    const jobs = [];

    let currentPage = 1;
    let keepScraping = true;

    while (keepScraping) {
      const response = await axios.get(`https://partnershipjobs.ca/jobs?page=${currentPage}`);
      const $ = cheerio.load(response.data);

      if ($('body').text().includes('No listings were found with the given criteria.')) {
        keepScraping = false;
      } else {
        $('table > tbody > tr').each(async (index, element) => {
          const positionElement = $(element).find('td:nth-child(1)').find('a');
          const position = positionElement.text().trim();
          const url = 'https://partnershipjobs.ca' + positionElement.attr('href');
          const organization = $(element).find('td:nth-child(2)').text().trim();
          const location = $(element).find('td:nth-child(3)').text().trim();
          const opened = $(element).find('td:nth-child(4)').text().trim();
          const closes = $(element).find('td:nth-child(5)').text().trim();
          const details = await getJobDetails(url);
          const scrapedOn = new Date().toISOString().substring(0, 10); // get only the date part

          jobs.push({ 
            position, 
            url, 
            organization, 
            location, 
            opened, 
            closes, 
            salary: details.salary, 
            jobDescription: details.jobDescription,
            scrapedOn
          });

          await sleep(5000); // Wait for 5 seconds before moving to the next job
        });

        currentPage += 1;
        await sleep(5000); // Wait for 10 seconds before moving to the next page
      }
    }

    const timestampedFilename = getTimestampedFilename();
    fs.writeFileSync(timestampedFilename, JSON.stringify(jobs, null, 2));
    console.log(`The scraped data has been saved in the timestamped file: ${timestampedFilename}`);

    fs.writeFileSync('jobs.json', JSON.stringify(jobs, null, 2));
    console.log('jobs.json file has been saved with the scraped data.');
  } catch (error) {
    console.error('Error while scraping:', error.message);
  }
})();

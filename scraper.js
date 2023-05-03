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
    const compensationRegex = /(compensation|salary)[\s\S]*?(\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?[-\s]*?(?:\d{1,3}(?:,\d{3})*(?:\.\d{2})?)?)\s*(hourly|per hour)?/i;
    const match = compensationText.match(compensationRegex);

    if (match) {
      salary = match[2];
      const isHourly = match[3] && match[3].toLowerCase().includes('hour');

      if (isHourly) {
        const hourlyWage = parseFloat(salary.replace(/[$,]/g, ''));
        const annualWage = hourlyWage * 1680; // 1680 hours per year
        salary = `$${annualWage.toFixed(2)}`;
      } else {
        const numberRegex = /\d{1,3}(?:,\d{3})*(?:\.\d{2})?/;
        const salaryNumbers = salary.match(numberRegex);

        if (salaryNumbers && salaryNumbers.length > 0) {
          const rawSalary = parseFloat(salaryNumbers[0].replace(/,/g, ''));

          if (/^\d{4}$/.test(salaryNumbers[0])) { // 4 digits without a period (####)
            salary = `$${(rawSalary * 52).toFixed(2)}`;
          } else if (/^\d{2}\.\d{2}$/.test(salaryNumbers[0])) { // 4 numbers separated by a period (##.##)
            salary = `$${(rawSalary * 1700).toFixed(2)}`;
          } else if (/^\d{5,6}$/.test(salaryNumbers[0])) { // 5-digit and 6-digit numbers
            salary = `$${rawSalary.toFixed(2)}`;
          }
        }
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

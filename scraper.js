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
      /(?:Compensation|Salary|Pay)[:\s]*\$?\s*(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/,  // $30.41 per hour
      /(?:Compensation|Salary|Pay)[:\s]*Up to\s*(\d{1,3}(?:,\d{3})?)/,  // Up to $73,599
      /(?:Compensation|Salary|Pay)[:\s]*(\d{2,3}\.\d{2}\s*-\s*\d{2,3}\.\d{2})/,  // $61,204 to $85,514 per year
      /(?:Compensation|Salary|Pay)[:\s]*Starting at\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*per hour/,  // Starting at $30.41 per hour
      /(?:Compensation|Salary|Pay)[:\s]*Between\s*(\d{1,3}(?:,\d{3})?)\s*and\s*(\d{1,3}(?:,\d{3})?)/,  // $121,166 - $144,309
      /(?:Salary|Pay)[:\s]*Over\s*\$?(\d{1,3}(?:,\d{3})*)/,  // Over $100K
      /\b(\d{1,3}(?:,\d{3})?)\s*(?:à|to)\s*(\d{1,3}(?:,\d{3})?)\s*\$/,  // 61 204 à 85 514 $
      /(?:Salary Range|Hiring Range)[:\s]*\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/,  // Salary Range: $928.59/weekly
      /(?:Salary Range|Hiring Range)[:\s]*\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*-\s*\$?(\d{1,3}(?:,\d{3}))*(?:\.\d{2})?/,  // $928.59/weekly - $1075.07/weekly
      /(\d{1,3}(?:,\d{3})?)\s*[kK]/,  // 75k or 90k
      /Hourly range:\s*\$?(\d{1,3}(?:\.\d{2})?)\s*-\s*\$?(\d{1,3}(?:\.\d{2})?)/,  // Hourly range: $20.17 - $31.70
      /Minimum:\s*Lib III\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*Lib IV\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/,  // Minimum: Lib III $94,466 Lib IV $111,305
      /Salary RangeFrom\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*to\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*per annum/,  // Salary RangeFrom $88,379 to $104,312 per annum
      // Previous patterns...
      /Minimum salary: LIB III:\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?);\s*LIB IV:\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/,  // Minimum salary: LIB III: $95,411; LIB IV: $112,418
      /Compensation Starting\s*\$?\s*(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/,  // Compensation Starting $ 60,000
      /Compensation Classification\s*\d+,\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*-\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/,  // Compensation Classification 8, $24,232.39 - $24,981.84
      /Compensation Salary range for Librarians is\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*to\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/,  // Compensation Salary range for Librarians is $78,446 to $128,875
      /salary range is between\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*and\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/,  // salary range is between $59,670 and $71,400
      /\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*-\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/,  // $85,904 - $103,667
      /\$?(\d{1,3}(?:\.\d{2})?)/,  // $21.69
      /The salary range for this position begins at\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/,  // The salary range for this position begins at $69,542
      /\$?(\d{1,3}(?:\.\d{2})?)\s*-\s*\$?(\d{1,3}(?:\.\d{2})?)\s*per hour/,  // $34.96 - $41.16 per hour
      /Compensation From\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*to\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*bi-weekly/,  // Compensation From $1,732 to $2,418 bi-weekly
      /position starts at\s*\$?(\d{1,3}(?:\.\d{2})?)/,  // position starts at $27.43
      /Compensation Minimum salary: LIB I:\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?);\s*LIB II:\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?);\s*LIB III:\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/,  // Compensation Minimum salary: LIB I: $71,451; LIB II: $74,553; LIB III: $95,411
      /Full-Time Pay Scale Group & Hiring Zone: [^\n]+\s*-\s*Step \d:\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/  // Full-Time Pay Scale Group & Hiring Zone: CUPE 1230 (4U) - Step 1: $65,477
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

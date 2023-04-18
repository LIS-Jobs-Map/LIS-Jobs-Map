mapboxgl.accessToken = 'pk.eyJ1IjoiY211cmd1MTk5MiIsImEiOiJjbGdiOWJrbGIxMWZrM2xvd3d4d2Z0MDUxIn0.-AOw-79x1dTTTJnhMLF47w';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v11',
  center: [-98.0, 51.0],
  zoom: 3
});

let allJobs = [];
let markers = [];

async function loadJobData() {
  const response = await fetch('jobs.json');
  allJobs = await response.json();
  updateMarkers(allJobs);
}

function updateMarkers(jobs) {
  clearMarkers();

  for (const job of jobs) {
    addMarker(job);
  }

  // Update job count
  const jobCount = document.getElementById('job-count');
  jobCount.textContent = jobs.length;
}


async function addMarker(job) {
  const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(job.location)}.json?access_token=${mapboxgl.accessToken}`);
  const data = await response.json();

  if (data.features && data.features.length > 0) {
    const lngLat = data.features[0].center;

    const popup = new mapboxgl.Popup()
      .setHTML(`
        <h5><a href="${encodeURI(job.url)}" target="_blank">${job.position}</a></h5>
        <p>Organization: ${job.organization}</p>
        <p>Location: ${job.location}</p>
        <p>Opened: ${job.opened}</p>
        <p>Closes: ${job.closes}</p>
        <p>Salary: ${job.salary}</p>
      `);

    const marker = new mapboxgl.Marker()
      .setLngLat(lngLat)
      .setPopup(popup)
      .addTo(map);

    // Add the province property to the job object
    job.province = job.location.split(", ").pop();

    // Store the job object in the marker
    marker.job = job;

    markers.push(marker);
  } else {
    console.warn(`Unable to geocode location: ${job.location}`);
  }
}



function clearMarkers() {
  for (const marker of markers) {
    marker.remove();
  }
  markers = [];
}

function updateMapMarkers() {
  const jobTypeInput = document.querySelector('input[name="job-type"]:checked');
  const jobType = jobTypeInput ? jobTypeInput.value : 'all';
  const salarySlider = document.getElementById('salary-slider');
  const salarySliderContainer = document.getElementById('salary-slider-container');
  const salaryFilter = (salarySlider && salarySliderContainer.style.display === 'block') ? parseInt(salarySlider.value) : 0;
  
  const selectedProvinces = getSelectedProvinces();
  const selectedTypes = getSelectedTypes();
  let filteredJobs;

  if (selectedProvinces.length === 0 && selectedTypes.length === 0) {
    filteredJobs = allJobs;
  } else {
    if (selectedProvinces.length === 0 || selectedTypes.length === 0) {
      if (selectedProvinces.length === 0) {
        filteredJobs = filterJobsByType(allJobs, selectedTypes);
      } else {
        filteredJobs = filterJobsByProvince(allJobs, selectedProvinces);
      }
    } else {
      const filteredByProvince = filterJobsByProvince(allJobs, selectedProvinces);
      filteredJobs = filterJobsByType(filteredByProvince, selectedTypes);
    }
  }

  filteredJobs = filteredJobs.filter(job => {
    if (job.salary !== 'N/A') {
      const salaryRange = job.salary.split('-');
      const minSalary = parseFloat(salaryRange[0].replace(/[$,]/g, ''));
      return salaryFilter <= minSalary;
    }
    return true;
  });

  updateMarkers(filteredJobs);
}

const salaryFilterBtn = document.getElementById('salary-filter-btn');
const salarySliderContainer = document.getElementById('salary-slider-container');
const salarySlider = document.getElementById('salary-slider');
const salarySliderValue = document.getElementById('salary-slider-value');

if (salarySlider) {
  salarySlider.addEventListener('input', (event) => {
    const value = parseInt(event.target.value, 10);
    salarySliderValue.textContent = value;
  });

  salarySlider.addEventListener('change', (event) => {
    // Update map markers based on the slider value
    updateMapMarkers();
  });
}



function getSelectedProvinces() {
  const provinces = ['AB', 'BC', 'MB', 'NB', 'NL', 'NT', 'NS', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT', 'Other'];
  return provinces.filter(province => document.getElementById(province).checked);
}

function filterJobsByProvince(jobs, provinces) {
  const canadianProvinces = ['AB', 'BC', 'MB', 'NB', 'NL', 'NT', 'NS', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'];
  return jobs.filter(job => {
    // If "Other" is selected, include jobs that are not in Canadian provinces or territories
    if (provinces.includes("Other") && !canadianProvinces.includes(job.province)) {
      return true;
    }
    // Otherwise, include jobs that are in the selected provinces
    return provinces.includes(job.province);
  });
}

 // Filter jobs by type
 function filterJobsByType(jobs, types) {
  return jobs.filter(job => {
    const org = job.organization.toLowerCase();
    const isAcademic = /university|college|université|universite|ocad/.test(org);
    const isPublic = /public|courthouse|regional|city|municipal|area|memorial|west|east|north|south|government|county|legislative/.test(org);
    const isPrivate = !(isAcademic || isPublic);

    if (types.includes("Academic") && isAcademic) {
      return true;
    }

    if (types.includes("Public") && isPublic) {
      return true;
    }

    if (types.includes("Private") && isPrivate) {
      return true;
    }

    return false;
  });
}



function getSelectedTypes() {
  const types = ['Academic', 'Public', 'Private'];
  return types.filter(type => document.getElementById(type).checked);
}


function filterJobsClosingSoon(jobs) {
  const now = new Date();
  const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  return jobs.filter(job => {
    const closingDate = new Date(job.closes);
    return closingDate >= now && closingDate <= sevenDaysLater;
  });
}

loadJobData();


document.querySelectorAll("#controls input[type='checkbox']").forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const selectedProvinces = getSelectedProvinces();
      const selectedTypes = getSelectedTypes();
      let filteredJobs;

      // If no provinces or types are selected, show all jobs
      if (selectedProvinces.length === 0 && selectedTypes.length === 0) {
        filteredJobs = allJobs;
      } else {
        // If only provinces or only types are selected, filter by those
        if (selectedProvinces.length === 0 || selectedTypes.length === 0) {
          if (selectedProvinces.length === 0) {
            filteredJobs = filterJobsByType(allJobs, selectedTypes);
          } else {
            filteredJobs = filterJobsByProvince(allJobs, selectedProvinces);
          }
        } else {
          // If both provinces and types are selected, filter by both
          const filteredByProvince = filterJobsByProvince(allJobs, selectedProvinces);
          filteredJobs = filterJobsByType(filteredByProvince, selectedTypes);
        }
      }
      updateMarkers(filteredJobs);
    });
  });

  const clearFiltersBtn = document.getElementById('clear-filters-btn');

  clearFiltersBtn.addEventListener('click', () => {
    // Reset job type filter
    const allJobsRadio = document.querySelector('input[name="job-type"][value="all"]');
    if (allJobsRadio) {
      allJobsRadio.checked = true;
    }
  
    // Reset salary filter
    if (salarySlider && salarySliderValue && salarySliderContainer) {
      salarySlider.value = 0;
      salarySliderValue.textContent = 0;
      salarySliderContainer.style.display = 'none';
    }
  
    // Reset province and type filters
    document.querySelectorAll("#controls input[type='checkbox']").forEach(checkbox => {
      if (checkbox) {
        checkbox.checked = false;
      }
    });
  
    // Update map markers based on the default filter values
    updateMarkers(allJobs);
  });
  
  function searchJobs(jobs, keywords) {
    return jobs.filter(job => {
      const title = job.position.toLowerCase();
      const organization = job.organization.toLowerCase();
      const location = job.location.toLowerCase();
  
      return (
        title.includes(keywords) ||
        organization.includes(keywords) ||
        location.includes(keywords)
      );
    });
  }

const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const closingSoonBtn = document.getElementById('closing-soon-btn');

closingSoonBtn.addEventListener('click', () => {
  const filteredJobs = filterJobsClosingSoon(allJobs);
  updateMarkers(filteredJobs);
});

searchBtn.addEventListener('click', () => {
  const keywords = searchInput.value.trim().toLowerCase();
  const filteredJobs = searchJobs(allJobs, keywords);
  updateMarkers(filteredJobs);
});

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchBtn.click();
  }
});

async function loadJobData() {
  const spinner = document.getElementById("loading-spinner");
  spinner.style.display = "block";

  const response = await fetch("jobs.json");
  allJobs = await response.json();

  // Artificial delay for demonstration purposes
  await new Promise(resolve => setTimeout(resolve, 2000));

  updateMarkers(allJobs);

  spinner.style.display = "none";
};

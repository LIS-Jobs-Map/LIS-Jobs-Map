mapboxgl.accessToken = 'pk.eyJ1IjoiY211cmd1MTk5MiIsImEiOiJjbGdiOWJrbGIxMWZrM2xvd3d4d2Z0MDUxIn0.-AOw-79x1dTTTJnhMLF47w';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v11',
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
  const jobType = document.querySelector('input[name="job-type"]:checked').value;
  const salarySlider = document.getElementById('salary-slider');
  const salaryFilter = salarySlider ? parseInt(salarySlider.value) : 0;

  markers.forEach(marker => {
    const job = marker.job;

    if (jobType === 'all' || job.category === jobType) {
      if (job.salary !== 'N/A') {
        const salaryRange = job.salary.split('-');
        const minSalary = parseFloat(salaryRange[0].replace(/[$,]/g, ''));

        if (salaryFilter <= minSalary) {
          marker.addTo(map);
        } else {
          marker.remove();
        }
      } else {
        marker.addTo(map);
      }
    } else {
      marker.remove();
    }
  });
}





const salaryFilterBtn = document.getElementById('salary-filter-btn');
const salarySliderContainer = document.getElementById('salary-slider-container');
const salarySlider = document.getElementById('salary-slider');
const salarySliderValue = document.getElementById('salary-slider-value');

salaryFilterBtn.addEventListener('click', () => {
  salarySliderContainer.style.display = salarySliderContainer.style.display === 'none' ? 'block' : 'none';
});

if (salarySlider) {
  salarySlider.addEventListener('input', (event) => {
    const value = parseInt(event.target.value, 10);
    salarySliderValue.textContent = value;

    // Update map markers based on the slider value
    updateMapMarkers(value);
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
    const isPublic = /public|courthouse|regional|city|municipal|area|memorial|west|east|north|south|government|county/.test(org);
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

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
        <h5><a href="${job.url}" target="_blank">${job.position}</a></h5>
        <p>Organization: ${job.organization}</p>
        <p>Location: ${job.location}</p>
        <p>Opened: ${job.opened}</p>
        <p>Closes: ${job.closes}</p>
      `);

    const marker = new mapboxgl.Marker()
      .setLngLat(lngLat)
      .setPopup(popup)
      .addTo(map);

    // Add the province property to the job object
    job.province = job.location.split(", ").pop();

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



loadJobData();

document.querySelectorAll("#controls input[type='checkbox']").forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const selectedProvinces = getSelectedProvinces();
    let filteredJobs;

    // If no provinces are selected, show all jobs
    if (selectedProvinces.length === 0) {
      filteredJobs = allJobs;
    } else {
      filteredJobs = filterJobsByProvince(allJobs, selectedProvinces);
    }
    updateMarkers(filteredJobs);
  });
});

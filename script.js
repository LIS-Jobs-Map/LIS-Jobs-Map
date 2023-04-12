console.log('begin script');

document.cookie = 'cookieName=cookieValue; SameSite=strict';

mapboxgl.accessToken = 'pk.eyJ1IjoiY211cmd1MTk5MiIsImEiOiJjbGdiOWJrbGIxMWZrM2xvd3d4d2Z0MDUxIn0.-AOw-79x1dTTTJnhMLF47w';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v11',
  center: [-98.0, 51.0],
  zoom: 3
});

loadJobData();

async function loadJobData() {
  const response = await fetch('jobs.json');
  const jobs = await response.json();

  const availableJobs = jobs.filter((job) => !isDateInPast(job.closes));

  availableJobs.forEach((job) => {
    geocodeAndAddMarker(job);
  });
}

async function geocodeAndAddMarker(job) {
  const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(job.location)}.json?access_token=${mapboxgl.accessToken}`);
  const data = await response.json();

  if (data.features && data.features.length > 0) {
    const lngLat = data.features[0].center;

    const popup = new mapboxgl.Popup()
      .setHTML(`
        <h3><a href="${job.url}" target="_blank">${job.position}</a></h3>
        <p>Organization: ${job.organization}</p>
        <p>Location: ${job.location}</p>
        <p>Opened: ${job.opened}</p>
        <p>Closes: ${job.closes}</p>
      `);

    const marker = new mapboxgl.Marker()
      .setLngLat(lngLat)
      .setPopup(popup)
      .addTo(map);
  } else {
    console.warn(`Unable to geocode location: ${job.location}`);
  }
}

function isDateInPast(dateString) {
  const date = new Date(dateString);
  const currentDate = new Date();
  return date < currentDate;
}


console.log('script over');

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const jobDescription = urlParams.get("jobDescription");

  const jobDescriptionContainer = document.getElementById("job-description");
  jobDescriptionContainer.textContent = jobDescription;
});

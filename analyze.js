// Replace `https://your-vercel-app-url` with your Vercel app's URL
const SERVERLESS_FUNCTION_URL = "https://lis-jobs-map.vercel.app/api/analyze_job_description";

async function analyzeJobDescription(jobDescription) {
  try {
    const response = await axios.post(
      "/api/analyze_job_description",
      { jobDescription },
      { headers: { "Content-Type": "application/json" } }
    );

    if (response.status === 200 && response.data.analysis) {
      const analysis = response.data.analysis;
      displayAnalysis(analysis);
    } else {
      console.error("Error calling serverless function: No analysis data received.");
    }
  } catch (error) {
    console.error("Error calling serverless function:", error);
  }
}

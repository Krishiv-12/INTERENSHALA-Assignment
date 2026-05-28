import axios from "axios";

const INTERNSHALA_URL = "https://internshala.com/hiring/search";
const API_TIMEOUT_MS = 20000;

const internshipsClient = axios.create({
  timeout: API_TIMEOUT_MS,
});

function mapApiError(error) {
  if (error.code === "ECONNABORTED") {
    return "The internship request timed out. Please try again.";
  }

  if (error.response?.status >= 500) {
    return "Internship service is temporarily unavailable.";
  }

  if (error.response?.status >= 400) {
    return "Unable to fetch internships due to a request error.";
  }

  return "Unable to fetch internships right now.";
}

export async function fetchInternships() {
  try {
    const response = await internshipsClient.get(INTERNSHALA_URL);
    return response.data;
  } catch (error) {
    throw new Error(mapApiError(error), { cause: error });
  }
}

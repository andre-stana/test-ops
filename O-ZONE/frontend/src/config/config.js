//API

const API_URL = process.env.REACT_APP_API_URL;
const API_PORT = process.env.REACT_APP_API_PORT;

if (!API_URL || !API_PORT) {
  throw new Error("API_URL and API_PORT must be defined in .env file");
}

export { API_URL, API_PORT };

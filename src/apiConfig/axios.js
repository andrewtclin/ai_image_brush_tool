import axios from "axios";

// export const host = process.env.REACT_APP_API_HOST;
// export const port = process.env.REACT_APP_API_PORT;

export const host = window.location.hostname;
export const port = window.location.port;

console.log("Specified API Endpoint::", host + ":" + port);
let baseURL = `https://${host}:${port}`;

if (!port) {
  baseURL = `https://${host}`;
}

export const axiosRoot = axios.create({
  //API BASE URL
  baseURL: baseURL,
});

export const axiosFileSystem = axios.create({
  baseURL: baseURL + "/file",
});

import axios from "axios";

export const host = window.location.hostname;
export const port = window.location.port;

console.log("Specified API Endpoint::", host + ":" + port);
let baseURL = `http://${host}:${port}`;

if (!port) {
  baseURL = `http://${host}`;
}

export const axiosRoot = axios.create({
  //API BASE URL
  baseURL: baseURL,
});

export const axiosFileSystem = axios.create({
  baseURL: baseURL + "/file",
});

const { default: axios } = require("axios");
const { serverconstants } = require("./serverconstant");

const securedAPI = axios.create({
  baseURL: serverconstants.authenticationServerURL,
});

securedAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("myToken");
  config.headers.accessToken = token;
});

const publicAPI = axios.create({
  baseURL: serverconstants.authenticationServerURL,
});

export default { securedAPI, publicAPI };

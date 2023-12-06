const { default: axios } = require("axios");
const { serverconstants } = require("./serverconstant");

const securedAPI = axios.create({
  baseURL: serverconstants.authenticationServerURL,
});

const ngRokSecuredAPI = axios.create({
  baseURL: serverconstants.ngRokURL,
});

ngRokSecuredAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("myToken");
  config.headers.accessToken = token;
});

securedAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("myToken");
  config.headers.accessToken = token;
});

const ngROKpublicAPI = axios.create({
  baseURL: serverconstants.ngRokURL,
});

const publicAPI = axios.create({
  baseURL: serverconstants.authenticationServerURL,
});

export default { securedAPI, publicAPI,ngRokSecuredAPI,ngROKpublicAPI };

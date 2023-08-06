import axios from "axios";

export const API_URL = "https://sanaripinter.cyclic.app";

const $api = axios.create({
  baseURL: API_URL + "/",
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bareer ${localStorage.getItem("token")}`;
  return config;
});

export default $api;

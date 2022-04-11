import axios from "axios";

const url = "https://api.artic.edu/api/v1/";

const api = axios.create({
  baseURL: url,
});

export default api;

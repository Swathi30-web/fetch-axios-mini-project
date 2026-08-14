import axios from "axios";

const api = axios.create({
  baseURL: "https://fetch-axios-api.onrender.com",
});

export default api;
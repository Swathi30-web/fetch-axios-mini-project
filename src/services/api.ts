import axios from "axios";

const api = axios.create({
  baseURL: "https://fetch-axios-api-xxxx.onrender.com",
});

export default api;
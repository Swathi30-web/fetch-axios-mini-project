import axios from "axios";

const api = axios.create({
  baseURL: "https://fetch-axios-mini-project-1.onrender.com",
});

export default api;
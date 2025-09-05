import axios from "axios";

const baseURL = "http://localhost:8080"; // Backend URL

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

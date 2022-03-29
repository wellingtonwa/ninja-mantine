import axios from "axios";

const baseUrl = "http://localhost:5000/";

const api = axios.create({
  baseURL: baseUrl
})

export default api;
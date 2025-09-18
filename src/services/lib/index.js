import axios from "axios";
import { storage } from "../utils/storage";
import { BASE_URL } from "./config";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor → attach token
api.interceptors.request.use(
  (config) => {
    const token = storage.getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor → handle errors globally
// Request interceptor → attach token
api.interceptors.request.use(
  (config) => {
    const token = storage.getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

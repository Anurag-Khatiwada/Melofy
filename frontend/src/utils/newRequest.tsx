// src/utils/axios.ts

import axios from "axios";

const newRequest = axios.create({
  baseURL: "http://localhost:5000", // adjust if needed
});

// Attach interceptor
newRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default newRequest;

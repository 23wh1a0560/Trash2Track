import axios from "axios";

let token = null;

export const setAuthToken = (newToken) => {
  token = newToken;
};

const API = axios.create({
  baseURL: "http://localhost:8080",
});

API.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
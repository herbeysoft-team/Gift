import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/",
  withCredentials: true,
});

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`;
    }
    return req;
  });
  
export const login = (formData) => API.post("/api/v1/auth/login", formData); //sign in for all users
export const register = (formData) => API.post("/api/v1/auth/signup", formData); //register users
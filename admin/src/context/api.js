import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/",
});

API.interceptors.request.use((req) => {
    if (localStorage.getItem("trowadmin")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("trowadmin")).token
      }`;
    }
    return req;
  });


/**AUTHENTICATION API */  
export const login = (formData) => API.post("/api/v1/auth/adminlogin", formData); //sign in for all users

/**DASHBOARD API */  
export const allcountfordashboard = () => API.get(`/api/v1/user/allcountfordashboard/`); //all count for dashboard
export const allgiftcount = () => API.get('/api/v1/trow/allgiftcount/'); // all gift count for dashboard
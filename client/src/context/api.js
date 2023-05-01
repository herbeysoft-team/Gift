import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/",
});

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`;
    }
    return req;
  });


/**AUTHENTICATION API */  
export const login = (formData) => API.post("/api/v1/auth/login", formData); //sign in for all users
export const register = (formData) => API.post("/api/v1/auth/signup", formData); //register users
export const logout = () => API.post("/api/v1/auth/logout"); //logout the user
export const resendOTP = (formData) => API.post("/api/v1/auth/phoneotp", formData); //request for new OTP
export const verify = (formData) => API.post("/api/v1/auth/verifyphoneotp", formData); //verify phone numbers with OTP
export const resetPasswordOTP = (formData) => API.post("/api/v1/auth/passwordreset", formData); //request for OTP to reset passowrd
export const resetPassword = (formData) => API.post("/api/v1/auth/reset", formData); //reset passowrd


/**USER API */
export const getUserProfile= (userId) => API.post(`/api/v1/user/getuserprofile/${userId}`); //get user profile
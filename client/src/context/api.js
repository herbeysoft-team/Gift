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
export const getUserProfile = (userId) => API.post(`/api/v1/user/getuserprofile/${userId}`); //get user profile
export const getUnfollowUsers = (id) => API.get(`/api/v1/user/getunfollowusers/${id}`); //get unfollow users
export const getSearchUsers= (searchname) => API.get(`/api/v1/user/getsearchusers/${searchname}`); //get search users
export const updateUserProfile = (updatedValue) => API.put("/api/v1/user/updateuserprofile", updatedValue); //update user profile
export const uploadProfilePic = (formData) => API.put("/api/v1/user/updateuserprofilepic", formData); //upload profile pic

/**RELATIONSHIP API */
export const addRelationship = (userId) => API.post(`/api/v1/relationship/addrelationship/${userId}`); //follow a user
export const deleteRelationship = (userId) => API.post(`/api/v1/relationship/deleterelationship/${userId}`); //unfollow a user
export const countRelationship = (userId) => API.get(`/api/v1/relationship/countrelationship/${userId}`); //count follower and following
export const checkRelationship = (userId) => API.get(`/api/v1/relationship/checkrelationship/${userId}`); //count follower and following

/**ITEM API */
export const getSubcategories = () => API.get(`/api/v1/subcategory/allsubcategories/`); //Get all Subcategories
export const createItem = (formData) => API.post(`/api/v1/item/createitem`,formData); //create an item
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
export const getUsersToGift= () => API.get(`/api/v1/user/getuserstogift/`); //getusers to gift
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
export const getItems = () => API.get(`/api/v1/item/allitems/`); //Get all items
export const getItemsByCategory = (newValue)=> API.get(`/api/v1/item/getitemsbysubcategory/${newValue}`); //Get items by category
export const getItemsBySearch = (searchName) => API.get(`/api/v1/item/getitemsbysearch/${searchName}`); //Get items by search

/**TROW API */
export const createTrow = (formData) => API.post(`/api/v1/trow/createtrow`,formData); //create a trowbox
export const createEvent = (formData) => API.post(`/api/v1/trow/createevent`,formData); //create an event
export const getTrow = (id) => API.get(`/api/v1/trow/gettrow/${id}`); //get a trowbox
export const addTrowWishlist = (id, trowWishlist) => API.post(`/api/v1/trow/addtrowwishlist/${id}`, trowWishlist) //add wishlist to trowbox
export const addTrowGift = (id, trowgift) => API.post(`/api/v1/trow/addtrowgift/${id}`, trowgift) //add wishlist to trowbox

/**WISHLIST API */
export const addWishlist= (item_id) => API.post(`/api/v1/wishlist/addwishlist/${item_id}`); //add item to wishlist
export const removeWishlist= (item_id) => API.post(`/api/v1/wishlist/removewishlist/${item_id}`); //remove item from wishlist
export const myWishlist= () => API.get(`/api/v1/wishlist/mywishlist/`); //Fetch my wishlist
export const wishlists = (userId) => API.get(`/api/v1/wishlist/wishlists/${userId}`); //fetch user wishlist
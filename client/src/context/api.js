import axios from "axios";

const API = axios.create({
  //baseURL: "http://localhost:8000/",
   baseURL: "https://trowbox.com/",
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
export const getUserProfile = (userId) => API.get(`/api/v1/user/getuserprofile/${userId}`); //get user profile
export const getUnfollowUsers = (id) => API.get(`/api/v1/user/getunfollowusers/${id}`); //get unfollow users
export const getSearchUsers= (searchname) => API.get(`/api/v1/user/getsearchusers/${searchname}`); //get search users
export const getUsersToGift= () => API.get(`/api/v1/user/getuserstogift/`); //getusers to gift
export const updateUserProfile = (updatedValue) => API.put("/api/v1/user/updateuserprofile", updatedValue); //update user profile
export const uploadProfilePic = (formData) => API.put("/api/v1/user/updateuserprofilepic", formData); //upload profile pic

/**RELATIONSHIP API */
export const addRelationship = (userId) => API.post(`/api/v1/relationship/addrelationship/${userId}`); //follow a user
export const deleteRelationship = (userId) => API.post(`/api/v1/relationship/deleterelationship/${userId}`); //unfollow a user
export const countRelationship = (userId) => API.get(`/api/v1/relationship/countrelationship/${userId}`); //count follower and following
export const checkRelationship = (userId) => API.get(`/api/v1/relationship/checkrelationship/${userId}`); //check follower and following
export const checkMutualRelationship = (userId) => API.get(`/api/v1/relationship/checkmutualrelationship/${userId}`); //check follower and following
export const getFollowers = (userId) => API.get(`/api/v1/relationship/getfollowers/${userId}`); //get all user followers
export const getFollowings = (userId) => API.get(`/api/v1/relationship/getfollowings/${userId}`); //get all user followings

/**ITEM API */
export const getCategories = () => API.get(`/api/v1/category/allcategories/`); //Get all Categories
export const getSubcategories = () => API.get(`/api/v1/subcategory/allsubcategories/`); //Get all Subcategories
export const createItem = (formData) => API.post(`/api/v1/item/createitem`,formData); //create an item
export const getItems = () => API.get(`/api/v1/item/allitems/`); //Get all items
export const getItem = (id) => API.get(`/api/v1/item/getitem/${id}`); //Get an item
export const getItemsByCategory = (newValue)=> API.get(`/api/v1/item/getitemsbycategory/${newValue}`); //Get items by category
export const getItemsBySubCategory = (newValue)=> API.get(`/api/v1/item/getitemsbysubcategory/${newValue}`); //Get items by category
export const getItemsBySearch = (searchName) => API.get(`/api/v1/item/getitemsbysearch/${searchName}`); //Get items by search

/**TROW API */
export const createTrow = (formData) => API.post(`/api/v1/trow/createtrow`,formData); //create a trowbox
export const createReTrow = (formData) => API.post(`/api/v1/trow/createretrow`,formData); //create a retrowbox
export const createEvent = (formData) => API.post(`/api/v1/trow/createevent`,formData); //create an event
export const getTrow = (id) => API.get(`/api/v1/trow/gettrow/${id}`); //get a trowbox
export const getUserSentGift= (id) => API.get(`/api/v1/trow/getusersentgift/${id}`); //get user sent gift
export const getEvent = (id) => API.get(`/api/v1/trow/getevent/${id}`); //get an eventbox
export const getAllEvent = () => API.get(`/api/v1/trow/getallevent`); //get all events 
export const getMyTrowBox = () => API.get(`/api/v1/trow/getmytrowbox`); //get my current trowbox
export const getMyScheduleTrowBox = () => API.get(`/api/v1/trow/getmyscheduletrowbox`); //get my schedule trowbox
export const addTrowWishlist = (id, trowWishlist) => API.post(`/api/v1/trow/addtrowwishlist/${id}`, trowWishlist) //add wishlist to trowbox
export const addTrowGift = (id, trowgift) => API.post(`/api/v1/trow/addtrowgift/${id}`, trowgift) //add wishlist to trowbox

/**WISHLIST API */
export const addWishlist= (item_id) => API.post(`/api/v1/wishlist/addwishlist/${item_id}`); //add item to wishlist
export const removeWishlist= (item_id) => API.post(`/api/v1/wishlist/removewishlist/${item_id}`); //remove item from wishlist
export const myWishlist= () => API.get(`/api/v1/wishlist/mywishlist/`); //Fetch my wishlist
export const wishlists = (userId) => API.get(`/api/v1/wishlist/wishlists/${userId}`); //fetch user wishlist

/**POST API */
export const createPost = (formData) => API.post(`/api/v1/post/createpost`,formData); //create a post
export const getPosts = (id) => API.get(`/api/v1/post/getposts/${id}`); //get posts
export const getPost = (id) => API.get(`/api/v1/post/getpost/${id}`); //get a post

/**ADD COMMENT API*/
export const addComment = (formData) => API.post(`/api/v1/comment/addcomment`, formData); //add a comment to post
export const deleteComment = (formData) => API.delete(`/api/v1/comment/deletecomment`, formData); //add a comment to post
export const getComments= (id) => API.get(`/api/v1/comment/getcomments/${id}`); //Fetch comments for a post in feed
export const getCommentsForPost= (id) => API.get(`/api/v1/comment/getcomments/${id}`); //Fetch comments for a post

/**ADD LIKE API*/
export const addLike = (formData) => API.post(`/api/v1/like/addlike`, formData); //like a post
export const deleteLike= (id) => API.delete(`/api/v1/like/deletelike/${id}`); //dislike a post
export const getLikes= (id) => API.get(`/api/v1/like/getlikes/${id}`); //Fetch all likes for a post
export const getLikesForTrowbox= (id) => API.get(`/api/v1/like/getlikesfortrowbox/${id}`); //Fetch all likes for trowbox
export const getLikesCount= (userId) => API.get(`/api/v1/like/getlikescount/${userId}`); //Get count of upvote of a particular user
export const getLikesForPost= (id) => API.get(`/api/v1/like/getlikes/${id}`); //fetch all like for a partiular post 
export const getPostUserUpvote= (userId) => API.get(`/api/v1/like/getpostuserupvote/${userId}`); //get all post user upvote 

/**NOTIFICATION API */
export const getMyNotification = () => API.get(`/api/v1/notification/getmynotification`); //Fetch all my notification
export const hasUnreadNotification = () => API.get(`/api/v1/notification/hasunreadnotification`); //Check if user has unread notification


/**RETROW API */
export const getRetrow= (id) => API.get(`/api/v1/like/getretrow/${id}`); //Fetch all retrow for the trowbox
export const getRetrowForPost= (id) => API.get(`/api/v1/like/getretrow/${id}`); //Fetch all retrow for the trowbox

/**MESSAGING API */
export const sendMessage = (formData) => API.post(`/api/v1/message/sendmessagetext`, formData); //send a message
export const sendMessageMedia = (formData) => API.post(`/api/v1/message/sendmessagemedia`, formData); //send a message media
export const getShare = (id) => API.get(`/api/v1/message/getshare/${id}`); //Fetch all share
export const getShareForPost = (id) => API.get(`/api/v1/message/getshare/${id}`); //Fetch share for a post
export const getMessages= (userId) => API.get(`/api/v1/message/getmessages/${userId}`); //Fetch all messages between users
export const hasNoUnreadMessages= () => API.get(`/api/v1/message/hasnounreadmessages`); //check if user does not have unread message
export const getMessagesUsers= () => API.get(`/api/v1/message/getmessagesusers`); //Fetch all users who you converse with
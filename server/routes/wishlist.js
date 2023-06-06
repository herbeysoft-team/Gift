const express = require("express");
const router = express.Router();
const {addwishlist, removewishlist, mywishlist, wishlists} = require("../controller/wishlist")
const verifyToken = require("../middleware/verifyToken");

/**ADD WISHLIST */
router.post("/addwishlist/:item_id", verifyToken, addwishlist);

/**REMOVE WISHLIST */
router.post("/removewishlist/:item_id", verifyToken, removewishlist);

/**MY WISHLIST */
router.get("/mywishlist", verifyToken, mywishlist);

/**FETCH WISHLIST FOR A USER */
router.get("/wishlists/:userId",  wishlists);

module.exports = router;
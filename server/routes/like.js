const express = require("express");
const router = express.Router();
const {
  addlike, getretrow, getlikes, deletelike, getlikescount, allupvote, getlikesfortrowbox, getpostuserupvote
} = require("../controller/like");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");


/**ADD LIKE*/
router.post("/addlike", verifyToken, addlike);

/**GET LIKE FOR A POST*/
router.get("/getlikes/:id", getlikes);

/**GET LIKE FOR A TROWBOX*/
router.get("/getlikesfortrowbox/:id", getlikesfortrowbox);

/**GET POST USER UPVOTE*/
router.get("/getpostuserupvote/:userId", getpostuserupvote);

/**GET ALL LIKES BY ADMIN*/
router.get("/allupvote", allupvote);

/**GET RETROW FOR A POST*/
router.get("/getretrow/:id", getretrow);

/**DISLIKE A POST*/
router.delete("/deletelike/:id", verifyToken, deletelike);

/**GET LIKE COUNT FOR USER*/
router.get("/getlikescount/:userId", getlikescount);




module.exports = router;
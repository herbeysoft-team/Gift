const express = require("express");
const router = express.Router();
const {
  addcomment, getcomments, deletecomment
} = require("../controller/comment");
const verifyToken = require("../middleware/verifyToken");


/**ADD COMMENT */
router.post("/addcomment", verifyToken, addcomment);

/**GET COMMENT FOR A POST*/
router.get("/getcomments/:postId", getcomments);

/**DELETE COMMENT FOR A POST*/
router.delete("/deletecomment/:commentId", verifyToken, deletecomment);




module.exports = router;
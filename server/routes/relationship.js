const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

const {
  addrelationship,
  deleterelationship,
  countrelationship,
  checkrelationship,
  checkmutualrelationship,
  getfollowers,
  getfollowings
  
} = require("../controller/relationship");

/**ADD RELATIONSHIP */
router.post("/addrelationship/:userId", verifyToken, addrelationship);

/**DELETE RELATIONSHIP */
router.post("/deleterelationship/:userId", verifyToken, deleterelationship);

/**COUNT RELATIONSHIP */
router.get("/countrelationship/:userId", countrelationship);

/**GET FOLLOWERS */
router.get("/getfollowers/:userId", getfollowers);

/**GET FOLLOWINGS */
router.get("/getfollowings/:userId", getfollowings);

/**CHECK RELATIONSHIP */
router.get("/checkrelationship/:userId", verifyToken, checkrelationship);

/**CHECK MUTUAL RELATIONSHIP */
router.get("/checkmutualrelationship/:userId", verifyToken, checkmutualrelationship);


module.exports = router;
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

const {
  addrelationship,
  deleterelationship,
  countrelationship,
  
} = require("../controller/relationship");

/**ADD RELATIONSHIP */
router.post("/addrelationship/:userId", verifyToken, addrelationship);

/**DELETE RELATIONSHIP */
router.post("/deleterelationship/:userId", verifyToken, deleterelationship);

/**COUNT RELATIONSHIP */
router.get("/countrelationship/:userId", countrelationship);


module.exports = router;
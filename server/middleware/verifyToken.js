const jwt = require("jsonwebtoken");
const { TOKEN_KEY, TOKEN_EXPIRY } = process.env;

const verifyToken = (req, res, next) => {
   const token = req.headers.authorization.split(" ")[1];
  //CHECK IF THE TOKEN EXIST
  if (!token) {
    return res.status(401).send("You are not authenticated");
  }

  //VERIFY THE TOKEN
  jwt.verify(token, TOKEN_KEY, (err, user) => {
    if (err) return res.status(403).send("Token is invalid");
    req.user = user;
    next();
  });
};

module.exports = verifyToken;

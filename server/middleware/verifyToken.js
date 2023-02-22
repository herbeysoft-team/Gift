const jwt = require("jsonwebtoken");
const { TOKEN_KEY, TOKEN_EXPIRY } = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.cookies.trowbox_token ||
    req.query ||
    req.body ||
    req.header["trowbox_token"];

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

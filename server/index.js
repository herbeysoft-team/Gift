require("dotenv").config(); //load environment variables
const express = require("express");  //import the express library
const cors = require("cors"); //safely recieve resources from another domain
const bodyParser = require("body-parser"); //to parse the body of HTTP request
var cookieParser = require('cookie-parser'); //to parse cookies
//routes import
const authRouter = require("./routes/auth");


//initialization
const port = process.env.PORT;
const app = express();


// middleware
//middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
  }));
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.disable('x-powered-by'); //less hackers know your stack


//routes
app.use("/api/v1/auth/", authRouter);

app.listen(port, () => console.log(`App Running on port ${port}`));
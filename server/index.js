require("dotenv").config(); //load environment variables
const express = require("express");  //import the express library
const cors = require("cors"); //safely recieve resources from another domain
const bodyParser = require("body-parser"); //to parse the body of HTTP request

//routes import
const authRouter = require("./routes/auth");

//initialization
const port = process.env.PORT;
const app = express();

// middleware
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));


//routes
app.use("/api/v1/auth/", authRouter);

app.listen(port, () => console.log(`App Running on port ${port}`));
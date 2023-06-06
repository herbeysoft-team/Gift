require("dotenv").config(); //load environment variables
const express = require("express"); //import the express library
const cors = require("cors"); //safely recieve resources from another domain
const bodyParser = require("body-parser"); //to parse the body of HTTP request
const multer = require("multer");
const path = require("path");
//routes import
const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/category");
const subcategoryRouter = require("./routes/subcategory");
const itemRouter = require("./routes/item");
const userRouter = require("./routes/user");
const relationshipRouter = require("./routes/relationship");
const trowRouter = require("./routes/trow");
const wishlistRouter = require("./routes/wishlist");
//const {multerMiddleware} = require("./middleware/multerUtil")

//initialization
const port = process.env.PORT;
const app = express();

//middlewares
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.disable("x-powered-by"); //less hackers know your stack



//routes
app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/category/", categoryRouter);
app.use("/api/v1/subcategory/", subcategoryRouter);
app.use("/api/v1/item/", itemRouter);
app.use("/api/v1/user/", userRouter);
app.use("/api/v1/relationship/", relationshipRouter);
app.use("/api/v1/trow/", trowRouter);
app.use("/api/v1/wishlist/", wishlistRouter);

app.listen(port, () => console.log(`App Running on port ${port}`));

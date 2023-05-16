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
const {multerMiddleware} = require("./middleware/multerUtil")

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

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/images");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    
//     cb(null, uniqueSuffix + ".jpeg" );
//   },
// });

// const upload = multer({ storage: storage });

// const uploadMiddleware = upload.single('file');

app.post("/api/v1/upload", multerMiddleware, (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
  console.log(file.filename)
});

//routes
app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/category/", categoryRouter);
app.use("/api/v1/subcategory/", subcategoryRouter);
app.use("/api/v1/item/", itemRouter);
app.use("/api/v1/user/", userRouter);
app.use("/api/v1/relationship/", relationshipRouter);

app.listen(port, () => console.log(`App Running on port ${port}`));

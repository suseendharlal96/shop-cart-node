const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const paypal = require("paypal-rest-sdk");

// const crypto = require("crypto");
const multer = require("multer");
// const GridFsStorage = require("multer-gridfs-storage");
// const methodOverride = require("method-override");
// const gridFsStream = require("gridfs-stream");
// const path = require("path");

// paypal.configure({
//   mode: "sandbox", //sandbox or live
//   client_id:
//     "AYaYjR_BdsBLWqETvY2N875uI5xxsMc56jsoh7EuEnbjE6hQNhtQxfKICh_WlKCgeRvsPF_z1d8qlBIH",
//   client_secret:
//     "EMx25vkROoL_5aXy6_I_aYu8gVZIcEINrLnhFoX8-OqZ8q5scye6_EmFsrUM2FK33riEscSpHFFcLq6J",
// });
const productRoute = require("./api/routes/products");
const orderRoute = require("./api/routes/orders");
const userRoute = require("./api/routes/user");
const movieRoute = require("./api/routes/movies");

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(methodOverride("_method"));

mongoose
  .connect(
    "mongodb+srv://suseendhar:susee123@cluster0-iwva7.mongodb.net/shoppingcart?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then((res) => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

// let gfs;
// connection.once("open", () => {
//   gfs = gridFsStream(connection.db, mongoose.mongo);
//   gfs.collection("uploads");
// });

// const storage = new GridFsStorage({
//   url:
//     "mongodb+srv://suseendhar:susee123@cluster0-iwva7.mongodb.net/shoppingcart?retryWrites=true&w=majority",
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString("hex") + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: "uploads",
//         };
//         resolve(fileInfo);
//       });
//     });
//   },
// });
// const upload = multer({ storage });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    return res.status(200).json({});
  }
  next();
});

// app.set("view engine", "ejs");

// app.get("/", (req, res, next) => {
//   gfs.files.find().toArray((err, files) => {
//     if (!files || files.length === 0) {
//       res.render("index", { files: false });
//     } else {
//       files.map((file) => {
//         if (
//           file.contentType === "image/jpeg" ||
//           file.contentType === "image/png"
//         ) {
//           file.isImage = true;
//         } else {
//           file.isImage = false;
//         }
//       });
//       res.render("index", { files: files });
//     }
//   });
// });

// app.post("/upload", upload.single("myfile"), (req, res) => {
//   res.status(200).json({
//     file: req.file,
//   });
// });

// app.get("/files", (req, res) => {
//   gfs.files.find().toArray((err, files) => {
//     if (!files || files.length === 0) {
//       return res.status(404).json({ err: "no files found" });
//     }
//     return res.json(files);
//   });
// });

// app.get("/files/:fileName", (req, res) => {
//   gfs.files.findOne({ filename: req.params.fileName }, (err, file) => {
//     if (!file || file.length === 0) {
//       return res.status(404).json({ err: "no file found" });
//     }
//     return res.json(file);
//   });
// });

// app.get("/image/:fileName", (req, res) => {
//   gfs.files.findOne({ filename: req.params.fileName }, (err, file) => {
//     if (!file || file.length === 0) {
//       return res.status(404).json({ err: "no file found" });
//     }
//     if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
//       const readStream = gfs.createReadStream(file.filename);
//       readStream.pipe(res);
//     } else {
//       return res.status(404).json({ error: "not an image" });
//     }
//   });
// });
app.use("/products", productRoute);
app.use("/orders", orderRoute);
app.use("/user", userRoute);
app.use("/movies", movieRoute);

app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: error.message,
  });
});

module.exports = app;

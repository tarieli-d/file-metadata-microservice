const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const app = express();

// Configurations for "body-parser"
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// Configurations for setting up ejs engine &
// displaying static files from "public" folder
// TO BE ADDED LATER
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(`${__dirname}/public`));

//file upload tool
const upload = multer({ dest: "public/files" });

// Routes will be added here
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  console.log(req.file);
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

//Express server
module.exports = app;

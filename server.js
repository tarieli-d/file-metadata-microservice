const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const app = express();

app.use("/public", express.static(process.cwd() + "/public"));

app.use(cors());
const upload = multer({ dest: "public/files" });

// Routes will be added here
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const port = 3000;

const server = app.listen(port, () => {
  console.log("Server is up listening on port:" + port);
});

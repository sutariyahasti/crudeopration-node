const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
var cors = require("cors");
const PORT = 4000;
const URL = "mongodb://127.0.0.1:27017/userdata" || "mongodb://localhost:27017/userdata"
require("dotenv").config();

const routes = require("./routes/users");

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);
app.use(express.static("public")); // Serve static files

app.listen(PORT, () => {
  console.log("server is running on", PORT);
});

mongoose.connect(
  URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  console.log("db connected")
);

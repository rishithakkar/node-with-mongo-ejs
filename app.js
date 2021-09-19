require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const cors = require("cors"); // handling cross-origin request
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(bodyParser.json()); // support parsing of application/json type post data
app.use(bodyParser.urlencoded({ extended: true })); //support parsing of application/x-www-form-urlencoded post data
app.use(cookieParser());

app.use(express.static("public"));

const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./utils/error-handler");

// Routes
app.use("/user", userRoutes);
app.use(errorHandler);

// DATABASE CONNECTION
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    console.log("Error occurred in connecting", err);
  } else {
    console.log("Mongo connected successfully");
  }
});

app.set("view engine", "ejs"); // To configure ejs
app.set("views", "views");

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("Something went wrong", err);
  } else {
    console.log(`Server running at http://127.0.0.1:${process.env.PORT}/`);
  }
});

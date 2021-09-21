// external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();

// Database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Databae Connected"))
  .catch((err) => console.log(err));

// Request process
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set  static folder
// app.use(express.static(path.join(__dirname, "public")));

// Perse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// route
app.use("/", (req, res) => {
  res.send("Hey, Buddy!!! What's up!");
});

app.listen(process.env.PORT, () => {
  console.log(`app listening at ${process.env.PORT}`);
});

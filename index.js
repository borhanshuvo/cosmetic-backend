// external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();
dotenv.config();

// internal imports
const usersRoute = require("./routers/usersRouter");

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
app.use(cors());

// Set  static folder
app.use(express.static(path.join(__dirname, "public")));

// route
app.get("/", (req, res) => {
  res.send("Hey, Buddy!!! What's up!");
});

app.use("/", usersRoute);

app.listen(process.env.PORT, () => {
  console.log(`app listening at ${process.env.PORT}`);
});

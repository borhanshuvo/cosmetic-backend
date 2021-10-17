// external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const engines = require("consolidate");
const http = require("http");

const app = express();
dotenv.config();
const server = http.createServer(app);

// socket.io creation
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
global.io = io;

// internal imports
const usersRoute = require("./routers/usersRouter");
const loginRoute = require("./routers/loginRouter");
const productRoute = require("./routers/productRouter");
const categoryRoute = require("./routers/categoryRouter");
const orderRoute = require("./routers/orderRouter");
const bidRequestRoute = require("./routers/bidRequestRouter");
const premiumBidRequestRoute = require("./routers/premiumBidRequestRouter");
const specialOfferRoute = require("./routers/specialOfferRouter");
const saveNotificationRoute = require("./routers/saveNotificationRouter");
const conversationRoute = require("./routers/conversationRouter");
const messageRoute = require("./routers/messageRouter");

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

// Set view engine
app.engine("ejs", engines.ejs);
app.set("views", "./views");
app.set("view engine", "ejs");

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// route
app.get("/", (req, res) => {
  res.send("Hey, Buddy!!! What's up!");
});

app.use("/user", usersRoute);
app.use("/login", loginRoute);
app.use("/product", productRoute);
app.use("/category", categoryRoute);
app.use("/order", orderRoute);
app.use("/bidRequest", bidRequestRoute);
app.use("/premiumBidRequest", premiumBidRequestRoute);
app.use("/specialOffer", specialOfferRoute);
app.use("/saveNotification", saveNotificationRoute);
app.use("/conversation", conversationRoute);
app.use("/message", messageRoute);

server.listen(process.env.PORT, () => {
  console.log(`app listening at ${process.env.PORT}`);
});

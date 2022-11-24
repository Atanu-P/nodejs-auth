const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const cookiParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

// express app
const app = express();

// connect to mongo db
const db_url =
  "mongodb+srv://node:node1234@test.7ydnwmm.mongodb.net/node_auth?retryWrites=true&w=majority";
mongoose
  .connect(db_url)
  .then((result) => {
    console.log("connected db");
    app.listen(3000);
  })
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookiParser());

// route
app.get("*", checkUser);
app.get("/", (req, res) => {
  res.render("home");
  console.log("home");
});

app.get("/profile", requireAuth, (req, res) => {
  res.render("profile");
});

app.use(authRoutes);

// cookies examples
// app.get("/set-cookies", (req, res) => {
//   res.cookie("newUser", false);
//   res.cookie("isEmployee", true, {
//     maxAge: 1000 * 60 * 60 * 24,
//     httpOnly: true,
//   });
//   console.log("cookie");
//   res.send("you got the cookies");
// });

// app.get("/read-cookies", (req, res) => {
//   const cookies = req.cookies;
//   console.log(cookies);
//   res.json(cookies);
// });

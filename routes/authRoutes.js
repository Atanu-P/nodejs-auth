const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/signup", (req, res) => {
  res.render("signup");
});
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).send("error, user not created");
  }
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", () => {});

module.exports = router;

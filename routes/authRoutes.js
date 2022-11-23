const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  console.log("###############################");
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(Object.values(err.errors));
    Object.values(err.errors).forEach((err) => {
      console.log(err.properties);
      errors[err.properties.path] = err.properties.message;
    });
    console.log(errors);
  }
  return errors;
};

// create jason web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "secret", { expiresIn: maxAge });
};

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
    console.log(user);
  } catch (err) {
    const errors = handleErrors(err);
    // res.status(400).send("error, user not created");
    res.status(400).json({ errors: errors });
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", () => {});

module.exports = router;

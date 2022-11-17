const express = require("express");
const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("signup");
});
router.post("/signup", () => {});
router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", () => {});

module.exports = router;

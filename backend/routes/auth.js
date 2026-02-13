const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// @route   POST /api/users/register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.register(name, email, password);
    const token = createToken(user._id);

    // Send cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ email, name, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// @route   POST /api/users/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ email, name: user.name, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// @route   POST /api/users/logout
router.post("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 }); // Clear cookie
  res.status(200).json({ message: "Logged out" });
});

module.exports = router;

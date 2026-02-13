const express = require("express");
const router = express.Router();
const protectRoute = require("../middlewares/auth");

const { getApis, addApi, voteApi } = require("../controllers/apiController");

// Public Routes
router.get("/", getApis);

// // Protected Routes (Login required)
// router.post("/", protectRoute, addApi);
// router.put("/:id/vote", protectRoute, voteApi);

module.exports = router;

console.log("🔥 ADMIN ROUTES LOADED FROM:", __filename);
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { getDashboardStats } = require("../controllers/adminController");

console.log("protect:", typeof protect);
console.log("getDashboardStats:", typeof getDashboardStats);

router.get("/dashboard", protect, getDashboardStats);

module.exports = router;
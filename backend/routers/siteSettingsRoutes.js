const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
    getSettings,
    updateSettings
} = require("../controllers/siteSettingsController");

// Get site settings
router.get("/", protect, getSettings);

// Update site settings
router.put("/", protect, updateSettings);

module.exports = router;

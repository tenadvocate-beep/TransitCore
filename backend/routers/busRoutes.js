const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const express = require("express");
const router = express.Router();

const {
    createBus,
    getBuses,
     getAvailableBuses,
    getBus,
    updateBus,
    deleteBus
} = require("../controllers/busController");

// Create a bus
router.post("/", protect, adminOnly, createBus);

// Get all buses
router.get("/", getBuses);

// Get available buses
router.get("/available", getAvailableBuses);

// Get one bus
router.get("/:id", getBus);

// Update bus
router.put("/:id", protect, adminOnly, updateBus);

// Delete bus
router.delete("/:id", protect, adminOnly, deleteBus);

module.exports = router;
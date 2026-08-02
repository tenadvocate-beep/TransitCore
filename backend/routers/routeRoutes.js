const express = require("express");
const router = express.Router();

const {
    createRoute,
    getRoutes,
    getRoute,
    updateRoute,
    assignBusesToRoute,
    deleteRoute
} = require("../controllers/routeController");

// Create a route
router.post("/", createRoute);

// Get all routes
router.get("/", getRoutes);

// Assign buses to route
router.put("/:id/assign-buses", assignBusesToRoute);

// Get one route
router.get("/:id", getRoute);

// Update a route
router.put("/:id", updateRoute);

// Delete a route
router.delete("/:id", deleteRoute);

module.exports = router;
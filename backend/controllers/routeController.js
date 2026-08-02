const Route = require("../models/Route");

// CREATE ROUTE
const createRoute = async (req, res) => {
    try {
        const route = await Route.create(req.body);

        res.status(201).json({
            success: true,
            message: "Route created successfully",
            route
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET ALL ROUTES
const getRoutes = async (req, res) => {
    try {
        const routes = await Route.find().populate("assignedBuses");

        res.status(200).json({
            success: true,
            routes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET SINGLE ROUTE
const getRoute = async (req, res) => {
    try {
        const route = await Route.findById(req.params.id).populate("assignedBuses");

        if (!route) {
            return res.status(404).json({
                success: false,
                message: "Route not found"
            });
        }

        res.status(200).json({
            success: true,
            route
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// UPDATE ROUTE
const updateRoute = async (req, res) => {
    try {
        const route = await Route.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Route updated successfully",
            route
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE ROUTE
const deleteRoute = async (req, res) => {
    try {
        await Route.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Route deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ASSIGN BUSES TO ROUTE
const assignBusesToRoute = async (req, res) => {
    try {
        const { assignedBuses } = req.body;

        const route = await Route.findByIdAndUpdate(
            req.params.id,
            {
                assignedBuses
            },
            { new: true }
        ).populate("assignedBuses");

        if (!route) {
            return res.status(404).json({
                success: false,
                message: "Route not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Buses assigned successfully",
            route
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
module.exports = {
    createRoute,
    getRoutes,
    getRoute,
    updateRoute,
     assignBusesToRoute,
    deleteRoute
};

console.log("🔥 LOADED CONTROLLER:", __filename);
const User = require("../models/User");
const Route = require("../models/route");
const Booking = require("../models/Booking");

const getDashboardStats = async (req, res) => {
    try {

        const totalUsers = await User.countDocuments();

        const totalRoutes = await Route.countDocuments();

        const totalBookings = await Booking.countDocuments();

        const routes = await Route.find();

        const availableSeats = routes.reduce(
            (sum, route) => sum + route.availableSeats,
            0
        );

        res.status(200).json({
            success: true,
            stats: {
                totalUsers,
                totalRoutes,
                totalBookings,
                availableSeats
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    getDashboardStats
};
console.log("🔥 EXPORTS:", module.exports);
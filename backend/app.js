const express = require("express");
const cors = require("cors");
require("dotenv").config();

console.log("Loading authRoutes...");
const authRoutes = require("./routers/authRoutes");

console.log("Loading busRoutes...");
const busRoutes = require("./routers/busRoutes");

console.log("Loading bookingRoutes...");
const bookingRoutes = require("./routers/bookingRoutes");

console.log("Loading routeRoutes...");
const routeRoutes = require("./routers/routeRoutes");

console.log("Loading adminRoutes...");
const adminRoutes = require("./routers/adminRoutes");

console.log("Loading paymentRoutes...");
const paymentRoutes = require("./routers/paymentRoutes");

console.log("Loading reviewRoutes...");
const reviewRoutes = require("./routers/reviewRoutes");


console.log("Loading siteSettingsRoutes...");
const siteSettingsRoutes = require("./routers/siteSettingsRoutes");

console.log("Loading notificationRoutes...");
const notificationRoutes = require("./routers/notificationRoutes");

console.log("All routes loaded successfully ✅");

const app = express();

app.use(cors()); 
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/site-settings", siteSettingsRoutes);
app.use("/api/notifications", notificationRoutes);


app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "🚍 Welcome to TransitCore API"
    });
});

module.exports = app;
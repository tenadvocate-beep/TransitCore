const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createBooking,
    getMyBookings,
    cancelBooking,
    initializePayment,
    getBookedSeats,
    paymentCallback,
    getBookingById,
    getAllBookings
} = require("../controllers/bookingController");


// Create a booking
router.post("/", protect, createBooking);


// Get my bookings
router.get("/my-bookings", protect, getMyBookings);

// Get all bookings
router.get("/all-bookings", protect, getAllBookings);


// Initialize Flutterwave payment
router.post("/payment", protect, initializePayment);


// Flutterwave callback
router.get("/payment-callback", paymentCallback);


// Get booked seats for a route
router.get("/booked-seats/:routeId", getBookedSeats);


// Cancel a booking
router.put("/:id/cancel", protect, cancelBooking);


// Get a single booking (keep this LAST)
router.get("/:id", getBookingById);


module.exports = router;
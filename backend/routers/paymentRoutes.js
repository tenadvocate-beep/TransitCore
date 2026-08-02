const express = require("express");

const router = express.Router();

const {
    initializePaystack
} = require("../controllers/paymentController");


// Test route
router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Payment route is working 🚀"
    });
});


// Paystack initialize payment
router.post("/paystack/initialize", initializePaystack);


module.exports = router;
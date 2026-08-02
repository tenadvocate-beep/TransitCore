const express = require("express");
const router = express.Router();

const adminOnly = require("../middleware/adminMiddleware");
const protect = require("../middleware/authMiddleware");

const {
    createReview,
    getReviews,
    getAllReviewsAdmin,
    deleteReview,
    approveReview
} = require("../controllers/reviewController");

// User creates a review
router.post("/", protect, createReview);

// Admin gets all reviews
router.get("/admin", protect, adminOnly, getAllReviewsAdmin);

// // Public gets published reviews only
router.get("/", getReviews);

// Admin deletes a review
router.delete("/:id", protect, adminOnly, deleteReview);

// Admin approves a review
router.patch("/:id/approve", protect, adminOnly, approveReview);

module.exports = router;

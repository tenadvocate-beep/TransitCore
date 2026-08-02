const Review = require("../models/Review");

// Create Review
exports.createReview = async (req, res) => {

    try {

        const existingReview = await Review.findOne({
            booking: req.body.booking
        });

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: "You have already reviewed this trip."
            });
        }

const review = await Review.create({
    user: req.user.id,
    booking: req.body.booking,
    route: req.body.route,
    rating: req.body.rating,
    comment: req.body.comment,
    published: false
});

        res.status(201).json({
            success: true,
            review
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get All Reviews
exports.getReviews = async (req, res) => {

    try {

        const reviews = await Review.find({
            published:true
        })
        .populate("user", "name")
        .populate("route", "origin destination")
        .sort({ createdAt: -1 });


        res.json({
            success:true,
            reviews
        });

    } catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};
// Delete Review
exports.deleteReview = async (req, res) => {

    try {

        await Review.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Review deleted"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
// Approve Review
exports.approveReview = async (req, res) => {

    try {

        const review = await Review.findById(req.params.id);

        if(!review){
            return res.status(404).json({
                success:false,
                message:"Review not found"
            });
        }


        review.published = true;

        await review.save();


        res.json({
            success:true,
            message:"Review approved",
            review
        });


    } catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};

// Admin Get All Reviews
exports.getAllReviewsAdmin = async (req, res) => {

    try {

        const reviews = await Review.find()
            .populate("user", "name")
            .populate("route", "origin destination")
            .sort({ createdAt: -1 });


        res.json({
            success:true,
            reviews
        });


    } catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};
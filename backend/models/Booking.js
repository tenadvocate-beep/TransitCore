const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    route: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Route",
        required: true
    },

    seatNumber: {
        type: Number,
        required: true
    },

    passengerName: {
        type: String,
        required: true
    },

    travelDate: {
        type: Date,
        required: true
    },

    bookingStatus: {
        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending"
    },

    paymentStatus: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending"
    },

    bookingCode: {
        type: String,
        unique: true
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Booking", bookingSchema);
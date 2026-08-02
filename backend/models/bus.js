const mongoose = require ("mongoose");

const busSchema = new mongoose.Schema(
    {
        busNumber: {
            type: String,
            required: true,
            unique: true
        },

        plateNumber: {
            type: String,
            required: true,
            unique: true
        },

        driverName: {
            type: String,
            required: true
        },

        capacity: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: ["available", "in-trip", "maintenance"],
            default: "available"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Bus", busSchema);
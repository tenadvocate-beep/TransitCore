const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema(
  {
    origin: {
      type: String,
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    departureTime: {
      type: String,
      required: true,
    },


    arrivalTime: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

   availableSeats: {
  type: Number,
  required: true,
},

assignedBuses: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bus",
  }
],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Route || mongoose.model("Route", routeSchema);
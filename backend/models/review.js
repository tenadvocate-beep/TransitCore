const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    booking:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Booking",
    required:true,
    unique:true
},

    route:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Route",
        required:true
    },

    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },

    comment:{
    type:String,
    required:true,
    trim:true
},

published:{
    type:Boolean,
    default:false
}
},
{
    timestamps:true
});

module.exports = mongoose.model("Review", reviewSchema);
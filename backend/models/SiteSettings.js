const mongoose = require("mongoose");

const siteSettingsSchema = new mongoose.Schema({

    siteName:{
        type:String,
        default:"TransitCore"
    },

    contactEmail:{
        type:String,
        default:""
    },

    contactPhone:{
        type:String,
        default:""
    },

    about:{
        type:String,
        default:""
    }

},{timestamps:true});

module.exports = mongoose.model("SiteSettings", siteSettingsSchema);
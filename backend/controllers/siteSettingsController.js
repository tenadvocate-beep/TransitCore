const SiteSettings = require("../models/SiteSettings");

// Get Site Settings
const getSettings = async (req, res) => {
    try {

        let settings = await SiteSettings.findOne();

        // Create default settings if none exist
        if (!settings) {
            settings = await SiteSettings.create({
                siteName: "TransitCore"
            });
        }

        res.json({
            success: true,
            settings
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


// Update Site Settings
const updateSettings = async (req, res) => {
    try {

        let settings = await SiteSettings.findOne();

        if (!settings) {
            settings = new SiteSettings();
        }

        settings.siteName = req.body.siteName;
        settings.contactEmail = req.body.contactEmail;
        settings.contactPhone = req.body.contactPhone;
        settings.about = req.body.about;

        await settings.save();

        res.json({
            success: true,
            message: "Site settings updated successfully.",
            settings
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    getSettings,
    updateSettings
};
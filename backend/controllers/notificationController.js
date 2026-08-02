const Notification = require("../models/Notification");

const getMyNotifications = async (req, res) => {
    try {

        const notifications = await Notification.find({
            user: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            notifications
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    getMyNotifications
};

const markNotificationsRead = async (req, res) => {
    try {

        const result = await Notification.updateMany(
            
            {
                user: req.user.id,
                read: false
            },
            {
                $set: {
                    read: true
                }
            }
        );

        console.log(result);
        
        res.status(200).json({
            success: true
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
module.exports = {
    getMyNotifications,
    markNotificationsRead
};
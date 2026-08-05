const express = require("express");
const router = express.Router();
const sendEmail = require("../utils/email");

const {
    registerUser,
    loginUser,
    adminLogin
} = require("../controllers/authController");


console.log("Loading authRoutes...");


// Register
router.post("/register", registerUser);


// User login
router.post("/login", loginUser);


// Admin login
router.post("/admin-login", adminLogin);



router.get("/test-email", async (req, res) => {
    try {

        await sendEmail({
            to: "olofin-samuel.oluwateniola@lmu.edu.ng",
            subject: "TransitCore Test Email",
            html: "<h2>🎉 TransitCore Email Test</h2><p>If you received this, email is working!</p>"
        });

        res.send("✅ Email sent successfully!");

    } catch (err) {

        console.error(err);
        res.status(500).send(err.message);

    }
});
module.exports = router;
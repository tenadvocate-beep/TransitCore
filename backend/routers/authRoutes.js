const express = require("express");
const router = express.Router();

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



module.exports = router;
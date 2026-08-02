const Booking = require("../models/Booking");
const Route = require("../models/route");
const User = require("../models/User");
const axios = require("axios");
const QRCode = require("qrcode");
const sendEmail = require("../utils/email");
const Notification = require("../models/Notification");

// Create Booking
const createBooking = async (req, res) => {
    try {

        const {
    route,
    seatNumber,
    passengerName,
    travelDate
} = req.body;
        const selectedRoute = await Route.findById(route);

        if (!selectedRoute) {
            return res.status(404).json({
                success: false,
                message: "Route not found"
            });
        }

        if (selectedRoute.availableSeats <= 0) {
            return res.status(400).json({
                success: false,
                message: "No seats available"
            });
        }

        const existingBooking = await Booking.findOne({
            route,
            seatNumber,
            bookingStatus: { $ne: "cancelled" }
        });

        if (existingBooking) {
            return res.status(400).json({
                success: false,
                message: "This seat has already been booked."
            });
        }

        const bookingCode =
            "TC-" + Math.floor(100000 + Math.random() * 900000);
           
        console.log("req.user:", req.user);

const booking = new Booking({
    user: req.user.id,
    route,
    seatNumber,
    passengerName,
    travelDate,
    bookingCode
});

console.log("Before save:", booking);

await booking.save();

console.log("After save:", booking);
await Notification.create({
    user: req.user.id,
    title: "🎫 Booking Confirmed",
    message: `Your seat ${seatNumber} to ${selectedRoute.destination} has been booked successfully.`
});

// Send booking confirmation email
try {

    const user = await User.findById(req.user.id);

    if (user && user.email) {

        await sendEmail({
            to: user.email,
            subject: "TransitCore Booking Confirmation",
            html: `
                <h2>Booking Successful 🎉</h2>

                <p>Hello ${user.name},</p>

                <p>Your TransitCore trip has been successfully booked.</p>

                <hr>

                <p><b>Route:</b> ${selectedRoute.origin} → ${selectedRoute.destination}</p>

                <p><b>Seat:</b> ${seatNumber}</p>

                <p><b>Travel Date:</b> ${travelDate}</p>

                <p><b>Booking Code:</b> ${bookingCode}</p>

                <br>

                <p>Thank you for choosing TransitCore.</p>
            `
        });

        console.log("Booking email sent");

    }

} catch(emailError){

    console.log("Email failed:", emailError.message);

}

        

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            booking
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get Logged-in User Bookings
const getMyBookings = async (req, res) => {
    try {

        const bookings = await Booking.find({
            user: req.user.id
        })
        .populate("route")
        .populate("user", "name email");

        res.status(200).json({
            success: true,
            bookings
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Cancel Booking
const cancelBooking = async (req, res) => {
    try {

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        booking.bookingStatus = "cancelled";

        await booking.save();

        res.status(200).json({
            success: true,
            message: "Booking cancelled successfully",
            booking
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Initialize Payment
const initializePayment = async (req, res) => {
    try {

        const { amount, email, bookingId } = req.body;
        const txRef = `TC-${bookingId}`;

        const response = await axios.post(
            "https://api.flutterwave.com/v3/payments",
            {
                tx_ref: txRef,
                amount,
                currency: "NGN",
                redirect_url: "https://transitcore-ylgu.onrender.com/api/bookings/payment-callback",
                customer: {
                    email
                },
                customizations: {
                    title: "TransitCore",
                    description: "Bus Booking Payment"
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        res.status(200).json({
            success: true,
            link: response.data.data.link
        });

    } catch (error) {

        console.log("FULL ERROR:");
        console.log(error);
        console.log("RESPONSE:");
        console.log(error.response?.data);
        console.log("MESSAGE:");
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: "Payment initialization failed"
        });

    }
};

// Get Booked Seats
const getBookedSeats = async (req, res) => {
    try {

        const bookings = await Booking.find({
            route: req.params.routeId,
            bookingStatus: { $ne: "cancelled" }
        });

        const bookedSeats = bookings.map(
            booking => booking.seatNumber
        );

        res.status(200).json({
            success: true,
            bookedSeats
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Payment Callback
const paymentCallback = async (req, res) => {

    try {

        const { status, tx_ref } = req.query;

        if (status !== "completed") {

            return res.send(`
                <h2>❌ Payment Failed</h2>
                <p>Your payment was not successful.</p>
            `);

        }

        // Find booking using the Flutterwave transaction reference
        const bookingId = tx_ref.replace("TC-", "");

const booking = await Booking.findById(bookingId);

     if (!booking) {
    return res.send(`
        <h2>❌ Booking Not Found</h2>
    `);
}

if (booking.paymentStatus === "paid") {
    return res.send(`
        <h2>✅ Payment Already Confirmed</h2>
    `);
}
        booking.paymentStatus = "paid";
        booking.bookingStatus = "confirmed";

        await booking.save();

const populatedBooking = await Booking.findById(booking._id)
    .populate("user")
    .populate("route");

const qrData = JSON.stringify({
    bookingCode: populatedBooking.bookingCode,
    passenger: populatedBooking.user?.name,
    route: `${populatedBooking.route.origin} → ${populatedBooking.route.destination}`,
    seat: populatedBooking.seatNumber
});

const qrCode = await QRCode.toDataURL(qrData);

        const route = await Route.findById(booking.route);

        if (route) {

            route.availableSeats -= 1;

            await route.save();

        }

       return res.send(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Payment Successful</title>

<style>

body{
    font-family:Arial,sans-serif;
    background:#f5f8ff;
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
}

.card{

    background:white;
    padding:40px;
    border-radius:20px;
    box-shadow:0 10px 30px rgba(0,0,0,.15);
    text-align:center;
    max-width:500px;

}

img{
    width:140px;
    margin-bottom:20px;
}

h1{
    color:#0b63ce;
}

p{
    color:#555;
}

.loader{

    margin:25px auto;
    width:50px;
    height:50px;
    border:5px solid #ddd;
    border-top:5px solid #0b63ce;
    border-radius:50%;
    animation:spin 1s linear infinite;

}

@keyframes spin{

    100%{
        transform:rotate(360deg);
    }

}

</style>

</head>

<body>

<div class="card">

<h1>✅ Payment Successful</h1>

<p>Your booking has been confirmed.</p>

<div class="loader"></div>

<p>Preparing your TransitCore Ticket...</p>

</div>

<script>

setTimeout(function(){

window.location.href="http://localhost:5500/ticket.html?booking=${booking._id}";

},3000);

</script>

</body>
</html>
`);

    } catch (err) {

        console.log(err);

        res.send("<h2>Something went wrong.</h2>");

    }

};
const getBookingById = async (req, res) => {

    try {

        const booking = await Booking.findById(req.params.id)
            .populate("route")
            .populate("user", "name email");

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }


        res.json({
            success: true,
            booking
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get All Bookings (Admin)
const getAllBookings = async (req, res) => {
    try {

        const bookings = await Booking.find()
            .populate("user", "name email")
            .populate("route");

        res.status(200).json({
            success: true,
            bookings
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    createBooking,
    getMyBookings,
    cancelBooking,
    initializePayment,
    getBookedSeats,
    paymentCallback,
    getBookingById,
    getAllBookings
};
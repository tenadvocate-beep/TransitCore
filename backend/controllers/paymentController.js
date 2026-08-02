const axios = require("axios");

const initializePaystack = async (req, res) => {

    try {

        const { email, amount } = req.body;

        const response = await axios.post(
            "https://api.paystack.co/transaction/initialize",
            {
                email,
                amount: amount * 100
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );


        res.json({
            success: true,
            data: response.data.data
        });


    } catch (error) {

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};


module.exports = {
    initializePaystack
};
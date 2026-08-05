const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = async (options) => {

    try {

        console.log("📧 Sending email to:", options.to);

        const info = await transporter.sendMail({
            from: `"TransitCore" <${process.env.EMAIL_USER}>`,
            to: options.to,
            subject: options.subject,
            html: options.html
        });

        console.log("✅ Email sent:", info.messageId);

    } catch (error) {

        console.error("❌ Email error:");
        console.error(error);

        throw error;
    }

};

module.exports = sendEmail;
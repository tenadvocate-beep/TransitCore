const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    family: 4,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    family: 4,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

transporter.verify((error, success) => {

    if (error) {
        console.error("SMTP Verify Error:", error);
    } else {
        console.log("SMTP server is ready ✅");
    }

});

const sendEmail = async (options) => {

    await transporter.sendMail({
        from: `"TransitCore" <${process.env.EMAIL_USER}>`,
        to: options.to,
        subject: options.subject,
        html: options.html
    });

};

module.exports = sendEmail;
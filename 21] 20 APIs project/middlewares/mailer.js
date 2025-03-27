const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "kamalsagpariya7@gmail.com",
        pass: "axxdixdaxtwguesa"
    },
});

module.exports.sendOtp = (email, otp) => {
    let mailOptions = {
        from: "kamalsagpariya7@gmail.com",
        to: email,
        subject: "OTP for forgot password",
        text: `Your OTP is ${otp}`
    };

    transport.sendMail(mailOptions, (err, info) => {
        err ? console.log(err) : console.log("Otp sent successfully !!!"); 
    });
};
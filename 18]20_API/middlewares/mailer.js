const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "pipaliyakaushik@gmail.com",
        pass: "bgrzfumhftxdguey"
    },
});

module.exports.sendOtp = (email, otp) => {
    let mailOptions = {
        from: "pipaliyakaushik@gmail.com",
        to: email,
        subject: "OTP for forgot password",
        text: `Your OTP is ${otp}`
    };

    transport.sendMail(mailOptions, (err, info) => {
        err ? console.log(err) : console.log("Otp sent successfully !!!"); 
    });
};
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "pipaliyakaushik2004@gmail.com",
        pass: "bgrzfumhftxdguey", 
    },
});

module.exports.sendOtp = (to, otp) => {
    let mailOptions = {
        from : "pipaliyakaushik2004@gmail.com",
        to : to,
        subject : "OTP for your forget password request",
        text : `Your otp is ${otp}`,
    }
    transport.sendMail(mailOptions, (err) => {
        err ? console.log(err) : console.log("OTP sended successfully! ");
    })
}
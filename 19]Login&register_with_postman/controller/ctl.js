const schema = require("../model/schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailer = require("../middleware/mailer");

module.exports.registerAdmin = async (req, res) => {
  console.log("Request Body:", req.body);
  let admin = await schema.findOne({ email: req.body.email });
  if (admin) {
    return res.status(200).json({ msg: "Admin already registered!" });
  }

  req.body.password = await bcrypt.hash(req.body.password, 5);

  await schema.create(req.body).then(() => {
    res.status(200).json({ msg: "Admin registered successfully!" });
  });
};
module.exports.logInAdmin = async (req, res) => {
  console.log("Request Body:", req.body);
  let admin = await schema.findOne({ email: req.body.email });
  if (!admin) {
    return res.status(200).json({ msg: "Admin not found!" });
  }
  if (await bcrypt.compare(req.body.password, admin.password)) {
    let token = jwt.sign({ admin }, "kp", { expiresIn: "1h" });
    res.status(200).json({ msg: "admin successfully logged ! ", token: token });
  } else {
    res.status(200).json({ msg: "password is wrong!" });
  }
};
module.exports.viewAdmin = async (req, res) => {
  await schema.find({}).then((data) => {
    res.status(200).json({ record: data });
  });
};
module.exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  let admin = await schema.findOne({ email: req.body.email });
  console.log(admin);

  if (!admin) {
    return res.status(404).json({ msg: "Admin not found!" });
  }

  const isMatch = await bcrypt.compare(oldPassword, admin.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Old password is incorrect!" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 5);

  admin.password = hashedPassword;
  await admin.save();

  res.status(200).json({ msg: "Password changed successfully!" });
};
module.exports.forgetPassword = async (req, res) => {
  let admin = await schema.findOne({ email: req.body.email });
  if (!admin) {
    return res.status(404).json({ msg: "Admin not found!" });
  }

  let otp = Math.floor(100000 + Math.random() * 900000);

  admin.otp = otp;
  admin.otpExpires = Date.now() + 10 * 60 * 1000;
  await admin.save();

  mailer.sendOtp(req.body.email, otp);

  res.status(200).json({ msg: "OTP sent successfully!"});
};

module.exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  let admin = await schema.findOne({ email });
  if (!admin) {
    return res.status(404).json({ msg: "Admin not found!" });
  }

  if (parseInt(admin.otp) !== parseInt(otp) || admin.otpExpires < Date.now()) {
    return res.status(400).json({ msg: "Invalid or expired OTP!" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 5);

  admin.password = hashedPassword;
  admin.otp = null;
  admin.otpExpires = null;
  await admin.save();

  res.status(200).json({ msg: "Password reset successfully!" });
};
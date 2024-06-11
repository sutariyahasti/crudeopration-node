const bcrypt = require("bcrypt");
const User = require("../model/userdata");
const OTP = require("../model/optSchemma");
require("dotenv").config();

const signup = async (req, res) => {
  try {
    const { address, email, name, password, phone, otp } = req.body;
    // Check if all details are provided
    if (!name || !email || !password || !otp) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    // Find the most recent OTP for the email
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(401).json({
        success: false,
        message: "The OTP is not valid",
      });
    }
    // Secure password
    // let hashedPassword;
    // try {
    //   hashedPassword = await bcrypt.hash(password, 10);
    // } catch (error) {
    //   return res.status(500).json({
    //     success: false,
    //     message: `Hashing password error for ${password}: ` + error.message,
    //   });
    // }
    const newUser = await User.create({
      address,
      email,
      name,
      password,
      // : hashedPassword,
      phone,
    });
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { signup };

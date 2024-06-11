require("dotenv").config();
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

//schema
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

async function sendVerificationEmail(email, otp) {
  try {
    
    // Create a Transporter to send emails
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "mitalipithadiya338@gmail.com",
        pass: "ksuydnrggkdfkejk",
      },
    });
    // Send emails to users
    let info = await transporter.sendMail({
      from: " mitalipithadiya338@gmail.com",
      to: email,
      subject: "otp",
      html: `your otp for verification ${otp}`,
    });
    console.log("mailSender email:", email);
    console.log("Email sent successfully:", info);
    return info;
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}
otpSchema.pre("save", async function (next) {
  console.log("New document saved to the database");
  // Only send an email when a new document is created
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

const Userotp = new mongoose.model("otp", otpSchema);
module.exports = Userotp;

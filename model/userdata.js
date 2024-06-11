const mongoose = require("mongoose");

//schema
const userSchemma = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    require: false,
  },
  lastLogin: {
    type: Date,
  },
});

const Userdata = new mongoose.model("userdata", userSchemma);
module.exports = Userdata;

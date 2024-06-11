const Userdata = require("../model/userdata");
const jwt = require("jsonwebtoken");
const secretKey = "hastisutariya";

const create = async (req, res) => {
  const { name, email, password, phone, address, role } = req.body;

  const existingUser = await Userdata.findOne({ email });

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with this email already exists" });
  } else {
    const user = new Userdata({ name, email, password, phone, address, role });

    try {
      const data = await user.save();
      res.status(201).json({ message: "User created successfully", data });
      console.log("Document saved:", data);
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(500).json({ message: "Error saving data" });
    }
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "req username or password" });
    }

    const existingUser = await Userdata.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({ message: "Invalid email" });
    }

    if (existingUser.password !== password) {
      return res.status(402).json({ message: "Invalid password" });
    }
    existingUser.lastLogin = new Date();
    await existingUser.save();

    // If email and password are valid, generate a JWT token
    const token = jwt.sign({ email, userId: existingUser._id }, secretKey);
    console.log("token=", token);

    // Return the token and a success message
    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

const getAll = async (req, res) => {
  try {
    const User = await Userdata.find();
    res.send(User);
  } catch {
    console.log("user not available");
  }
};

const get = async (req, res) => {
  const id = req.params.id;
  try {
    const User = await Userdata.find({ _id: id });
    res.send(User);

    if (!User) {
      res.send("user not available");
    }
  } catch {
    console.log("user not available error");
  }
};

const delet = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Userdata.deleteOne({ _id: id });

    if (!user) {
      res.send({ message: "user not found" });
    } else {
      console.log("User deleted successfully");
      res.status(200).send("User deleted successfully");
    }
  } catch {
    console.log("user not delet");
  }
};

const update = async (req, res) => {
  const id = req.params.id;
  const { ...rest } = req.body;

  try {
    const updatedUser = await Userdata.updateOne({ _id: id }, rest, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }
    res.send("User updeted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("User not updated");
  }
};

module.exports = {
  get,
  create,
  update,
  getAll,
  delet,
  login,
};

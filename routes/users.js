const {
  create,
  getAll,
  get,
  delet,
  update,
  login,
} = require("../controller/datacontrollers");
const multer = require("multer");

const { sendOTP } = require("../controller/otpControllers");
const { signup } = require("../controller/authController");
const express = require("express");
const upload = multer({ dest: "uploads/" }); // Update destination folder as needed
const router = express.Router();

router.post("/", create);
router.post("/login", login);
router.get("/", getAll);
router.get("/:id", get);
router.delete("/:id", delet);
router.put("/:id", update);
router.post("/send-otp", sendOTP);
router.post("/signup", signup);

module.exports = router;

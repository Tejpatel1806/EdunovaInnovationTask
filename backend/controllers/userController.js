const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");

const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, contactNumber } = req.body;
  const user = await User.create({
    name,
    email,
    contactNumber,
  });
  res.status(400).json({ success: true, user });
});
module.exports = { registerUser };

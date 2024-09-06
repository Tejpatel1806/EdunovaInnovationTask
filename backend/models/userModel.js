const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  contactNumber: {
    type: String,
    required: [true, "Please Enter Your Contact Number"],
    validate: {
      validator: function (v) {
        return validator.isMobilePhone(v, "en-IN");
      },
      message: "Please Enter a valid Contact Number",
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

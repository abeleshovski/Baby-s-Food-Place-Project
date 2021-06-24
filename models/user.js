const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: ["First name is required"],
  },
  lastName: {
    type: String,
    required: ["Last lane is Required"],
  },
  email: {
    type: String,
    required: ["Email is required"],
  },
  DOB: {
    type: Date,
    required: ["Date of Birth is required"],
  },
  password: {
    type: String,
    required: ["Password is required"],
  },
  avatar: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema, "users");

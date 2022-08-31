const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, max: 127 },
    email: { type: String, required: true, unique: true, max: 127 },
    password: { type: String, required: true, unique: true, max: 127 },
    role: {
      isAdmin: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
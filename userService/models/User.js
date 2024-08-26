const mongoose = require("mongoose");

const UserScheme = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  point: {
    type: Number,
    default: 0
  },
  
});

module.exports = mongoose.model("user", UserScheme);

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
  profilePicture: {
    type: String, 
    default: ''
  }
});

module.exports = mongoose.model('User', UserSchema);

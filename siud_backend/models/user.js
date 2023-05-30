const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  confPassword: {
    type: String,
    required: false,
    trim: true,
  },
  device: {
    type: String,
    required: false,
    trim: true,
    default: "",
  },
  data: {
    type: Array,
    required: false,
    trim: false,
  },
  colorPref: {
    type: Number,
    required: false,
    default: 1,
  }
}, {collection : 'users_list'});

const User = mongoose.model("User", UserSchema);

module.exports = User;
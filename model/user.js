const { Schema, model } = require("mongoose");

const userSchema = Schema({
  name: String,
  email: String,
  password: String,
  token: {
    type: String,
    default: null,
  },
});

const User = model("user", userSchema);

module.exports = User;

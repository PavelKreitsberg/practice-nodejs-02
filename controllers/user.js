const User = require("../model/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const bcryptjs = require("bcryptjs");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const candidate = await User.findOne({ email });
  if (candidate) {
    return res.status(400).json({
      message: `${email} is already registered`,
    });
  }
  const hashPassword = bcryptjs.hashSync(password, 10);

  const newUser = await User.create({ name, email, password: hashPassword });

  res.json({ user: newUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const candidate = await User.findOne({ email });

  if (!candidate) {
    return res.status(400).json({
      message: `${email} is not registered`,
    });
  }

  const comparePassword = bcryptjs.compareSync(password, candidate.password);

  if (!comparePassword) {
    return res.status(400).json({
      message: `Check your password`,
    });
  }

  const token = jwt.sign({ id: candidate._id }, SECRET_KEY);
  await User.findByIdAndUpdate(candidate._id, { token });

  res.json({
    token,
    user: candidate,
  });
};
const logout = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { token: null });
  res.status(204).json();
};
const current = async (req, res) => {
  res.send(req.user);
};

module.exports = {
  signup,
  login,
  logout,
  current,
};

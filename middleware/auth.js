const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../model/user");

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (!bearer || bearer !== "Bearer") {
    return res.status(401).json("Not authorized");
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const candidate = await User.findById(id);
    if (!candidate || token !== candidate.token) {
      return res.status(401).json("Not authorized");
    }
    req.user = candidate;
    next();
  } catch (error) {
    return res.status(401).json("Not authorized");
  }
};

module.exports = auth;

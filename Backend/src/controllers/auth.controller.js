const userModel = require("../models/user.model");
const blacklistModel = require("../models/blacklist.model");
const redis = require("../config/cache");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { username, email, password } = req.body;
  const isUserExists = await userModel.findOne({
    $or: [
      {
        email,
      },
      { username },
    ],
  });
  if (isUserExists) {
    res.status(400).json({
      message:
        "user with this" +
        (isUserExists.email === email
          ? " email already exists"
          : " username already exists"),
    });
  }
  const hashed = await bcrypt.hash(password, 11);
  const user = await userModel.create({
    username,
    email,
    password: hashed,
  });
  const token = await jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
  res.cookie("token", token);
  res.status(201).json({
    message: "user created successfully",
    user: {
      id: user_id,
      user: user.username,
      email: user.email,
    },
  });
}

async function loginUser(req, res) {
  const { email, password, username } = req.body;
  const user = await userModel
    .findOne({
      $or: [
        {
          email,
        },
        { username },
      ],
    })
    .select("+password");
  if (!user) {
    return res.status(401).json({
      message: "Invalid email/username or password",
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid email/username or password",
    });
  }
  const token = await jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
  res.cookie("token", token);
  res.status(200).json({
    message: "user logged in successfully",
  });
}

async function getMe(req, res) {
  const user = await userModel.findById(req.user.id);
  res.status(200).json({
    message: "user fetched successfully",
    user,
  });
}

async function logoutUser(req, res) {
  const token = req.cookies.token;
  res.clearCookie("token");
    
  await redis.set(token,Date.now().toString());

  res.status(201).json({
    message: "user logged out successfully",
  });
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
};

const userModel = require("../models/user.model");
const tokenBlackListModel = require("../models/blacklist.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { get } = require("mongoose");

/**
 *
 * @register user
 * @description register user and send data user data in response 
 */

async function registerUserController(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please provide username, email, and password.",
      });
    }

    const isUserAlreadyExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserAlreadyExist) {
      return res.status(400).json({
        message: "Username or email already exists.",
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      username,
      email,
      password: hash,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    // Consider adding secure: true, sameSite: 'strict' for production
    res.cookie("token", token, { httpOnly: true });

    return res.status(201).json({
      message: "User registered successfully!",
      user: { username: newUser.username, email: newUser.email },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res
      .status(500)
      .json({ message: "Server error during registration." });
  }
}

/**
 * 
 * @login user 
 * @description login user and send data user data in response 
 * 
 */
async function loginUserController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password.",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    // Consider adding secure: true, sameSite: 'strict' for production
    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({
      message: "User logged in successfully!",
      user: { username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error during login." });
  }
}

/**
 * 
 * @logout user 
 * @description add cookie to the blacklist 
 * 
 */
async function logoutUserController(req, res) {
  const token = req.cookies.token;

  if (token) {
    await tokenBlackListModel.create({ token });
  }

  res.clearCookie("token");

  res.status(200).json({
    message: "You are now logged out.",
  });
}

async function getMeController(req, res) {
  try {
    // Use await to execute the query and get the user document
    // Also, explicitly exclude the password from the result
    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Get Me Error:", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching user." });
  }
}

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
};

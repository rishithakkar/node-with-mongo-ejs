const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { encrypt, comparePassword } = require("../utils/bcrypt");
const { response } = require("../utils/response");

// Register user
exports.signup = async (req, res) => {
  const { first_name, last_name, email, contact, password } = req.body;

  try {
    // Check user is already exist or not
    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
      response(res, "User is already exists, try with diffrent email", null);
    } else {
      const encryptPass = await encrypt(password);
      const newUser = new User({ first_name, last_name, email, password: encryptPass, contact });

      await newUser.save(); // Inser user in collection
      response(res, "User register successfully", newUser);
    }
  } catch (err) {
    response(res, "Error when create user", err);
  }
};

// Login
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    const isPasswordMatch = await comparePassword(password, user.password);
    if (isPasswordMatch) {
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET);
      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      // response(res, "Logged in successfully", user);
      res.redirect("/dashboard");
    } else {
      response(res, "Wrong credentials!", user, 401);
    }
  } else {
    response(res, "User is not registered!", null, 500);
  }
};

// Get All Users
exports.users = async (req, res) => {
  try {
    const allUsers = await User.find();
    if (allUsers) {
      response(res, "All users", allUsers);
    } else {
      response(res, "Users not found!", {}, 400);
    }
  } catch (err) {
    response(res, "Something went wrong!", err, 500);
  }
};

// Update user data
exports.updateUsers = async (req, res) => {
  const { first_name, last_name, contact } = req.body;
  try {
    // Model.findOneAndReplace({ _id: id }, update, options, callback)
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { first_name, last_name, contact } },
      {
        new: true /* to get updated data */,
        upsert: true /*creates the object if it doesn't exist. */,
        timestamps: { createdAt: false, updatedAt: true },
      }
    );
    response(res, "User upadte successfully.", updatedUser);
  } catch (err) {
    response(res, "Something went wrong!", err, 500);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleteUsers = await User.findByIdAndDelete({ _id: req.params.id });
    response(res, "User deleted successfully.", deleteUsers);
  } catch (err) {
    response(res, "Something went wrong!", err, 500);
  }
};

const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const e = require("cors");

// generate jwt
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 3600 });
};

// register handle
const registerUser = async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, password, cpassword, isAdmin, pin } = req.body;
    if (!name || !email || !password || !cpassword)
      throw new Error("Missing fields");
    if (isAdmin && pin != process.env.ADMIN_PIN) throw new Error("Invalid PIN");
    console.log("till here");
    if (password != cpassword) throw new Error("Passwords not matching");
    const userExist = await User.find({ email });
    if (userExist != "") throw new Error("User already exists");
    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: isAdmin,
    });
    if (user) {
      // console.log(user);
      res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        isAdmin: user.isAdmin,
      });
    }
  } catch (err) {
    res.status(500);
    res.json({ error: err.message });
  }
};

// login handle
const authenticate = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("Missing fields");
    const user = await User.findOne({ email });
    if (user && (await bcryptjs.compare(password, user.password)))
      res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        isAdmin: user.isAdmin,
      });
    else throw new Error("Invalid Credentials!");
  } catch (err) {
    res.status(400);
    res.json({ error: err.message });
  }
};

// Update user Details
const updateUser = async (req, res) => {
  // console.log(req.body);
  const { name, email, id } = req.body;
  try {
    // check for current user
    const user = await User.findOne({ _id: id });
    if (user) {
      var updatedUser = null;
      // Update name only
      if (user.email === email) {
        // console.log("Same Email");
        updatedUser = await User.updateOne({ _id: id }, { name: name });
      }
      // Check if the new email is already registered or not
      else {
        // console.log("Different email");
        const alreadyExists = await User.findOne({ email: email });
        if (alreadyExists) throw new Error("Email is already registered!");
        // If email is not registered update both email and name
        updatedUser = await User.updateOne(
          { _id: id },
          { name: name, email: email }
        );
      }
      if (updatedUser) {
        res.status(200).json(updateUser);
      } else throw new Error("Internal Server Error!");
    } else throw new Error("User not found !");
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports = { registerUser, authenticate, updateUser };

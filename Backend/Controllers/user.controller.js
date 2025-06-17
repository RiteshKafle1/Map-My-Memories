const userModel = require("../Models/user.model");
const validator = require("validator");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { email, fullName, password } = req.body;

    const alreadyEmailExists = await userModel.findOne({ email });

    if (alreadyEmailExists)
      return res.json({ error: true, message: "Email Already Exists" });

    if (!email || !fullName || !password)
      return res.json({ error: true, message: " No Empty Fields allowed " });

    // if not valid it gives false
    if (!validator.isEmail(email))
      return res.json({ error: true, message: " Invalid Email " });

    if (!validator.isStrongPassword(password))
      return res.json({ error: true, message: " Weak Password " });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new userModel({
      email,
      fullName,
      password: hashedPassword,
    });
    await user.save();
    return res.status(201).json({
      error: false,
      message: "Account Created successfully",
      id: user._id,
      email: user.email,
      name: user.fullName,
    });
  } catch (error) {
    console.log("Error in register user function", error);
    return res.json({ error: true, message: "Failed to create Account" });
  }
};
module.exports = { registerUser };

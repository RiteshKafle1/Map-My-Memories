const userModel = require("../Models/user.model");
const validator = require("validator");
const bcrypt = require("bcrypt");
const generateToken = require("../Utility/generate.token");

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
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    // console.log(user);
    // if no user exists -> null
    if (!user) return res.json({ error: true, message: "No User Found" });
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    // if password donot match -> false
    if (!isPasswordMatch)
      return res.json({ error: true, message: "Invalid Credentials" });

    const token=await generateToken(user._id+user.email+user.password);

    return res.status(200).json({error:false,message:'Login Success',token:token});
  } catch (error) {
    console.log("Error in login User Function", error);
    return res.json({ error: true, message: "Login Failed" });
  }
};
module.exports = { registerUser, loginUser };

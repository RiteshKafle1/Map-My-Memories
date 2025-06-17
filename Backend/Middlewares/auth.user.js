const webToken = require("jsonwebtoken");
const userModel = require("../Models/user.model");

const authUser = async (req, res, next) => {
  try {
    const { utoken } = req.headers;
    if (!utoken)
      return res.json({ error: true, message: "Credentials Failed" });
    const signId = await webToken.verify(utoken, process.env.SECRETKEY);
    const { userId } = signId;

    if (signId) {
      req.user = userId;
      next();
    }
  } catch (error) {
    console.log("Error in auth User funciton", error);
    return res.json({ error: true, message: "Credentials Failed" });
  }
};
module.exports = authUser;

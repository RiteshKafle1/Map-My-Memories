const jsonToken = require("jsonwebtoken");

const generateToken = async (data) => {
  try {
    const token = await jsonToken.sign(
      { userId: data },
      process.env.SECRETKEY,
      { expiresIn: "5d" }
    );

    return token;
  } catch (error) {
    console.log("Error in generateToken function", error);
  }
};
module.exports=generateToken;
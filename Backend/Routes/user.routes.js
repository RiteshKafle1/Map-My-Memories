const express = require("express");
const userRouter = express.Router();
const { registerUser,loginUser, currentUser } = require("../Controllers/user.controller");
const authUser=require('../Middlewares/auth.user');

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get('/profile',authUser,currentUser);

module.exports = userRouter;

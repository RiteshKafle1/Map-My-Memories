const express = require("express");
const app = express();
require('dotenv').config();
const connectDB=require('../Backend/DB/connect.db');
const userRouter = require("./Routes/user.routes");
const travelRouter = require("./Routes/travelStory.routes");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/user',userRouter);
app.use('/travel',travelRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB(process.env.DB_URI);
  console.log("Server Running :) ")
});

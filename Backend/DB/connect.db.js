const mongoose = require("mongoose");

const connectDB = async (DB_URI) => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Connected to database")
    );
    await mongoose.connect(DB_URI);
  } catch (error) {
    console.log("Error in connecting to a dabatabse", error);
  }
};
module.exports = connectDB;

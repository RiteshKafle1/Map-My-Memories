const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    publicImageId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
const userModel = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = userModel;

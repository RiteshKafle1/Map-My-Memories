const mongoose = require("mongoose");
const travelSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    story: {
      type: String,
      required: true,
    },
    visitedLocation: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: "",
    },
    userId: {
      type: String,
      required: true,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    visitedDate: {
      type: String,
      required:true,
    },
  },
  { timestamps: true }
);
const travelModel =
  mongoose.models.Travel || mongoose.model("Travel", travelSchema);
module.exports = travelModel;

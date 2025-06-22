const express = require("express");
const travelRouter = express.Router();
const {
  addTravelStory,
  userTravelStory,
  editTravelStory,
  delTravelStory,
  searchTravelStory,
  filterByDate,
} = require("../Controllers/travelStory.controller");
const authUser = require("../Middlewares/auth.user");

const upload = require("../Config/multer.config");

travelRouter.post(
  "/add-story",
  authUser,
  upload.single("story-image"),
  addTravelStory
);
travelRouter.get("/story", authUser, userTravelStory);

travelRouter.put("/edit/story/:storyId", authUser, editTravelStory);

travelRouter.put("/edit/isfavourite/:storyId", authUser, editTravelStory);

travelRouter.delete('/delete-story/:id',authUser,delTravelStory );

travelRouter.get('/search-post',searchTravelStory);

travelRouter.get('/filter-post',filterByDate);

module.exports = travelRouter;

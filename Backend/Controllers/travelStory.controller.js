const travelModel = require("../Models/travel.model");
const cloudinary = require("../Config/cloud.config");

const addTravelStory = async (req, res) => {
  try {
    const { title, story, visitedLocation, visitedDate, isFavourite } =
      req.body;
    const imageFile = req.file;

    if (
      !title ||
      !story ||
      !visitedLocation ||
      !visitedDate ||
      !isFavourite ||
      !imageFile
    )
      return res.json({ error: true, message: "No Empty fields allowed" });

    let imageUrl = "";

    if (imageFile) {
      const image = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
        folder: "Story-Image",
      });
      imageUrl = image.secure_url;
    }

    const newStory = new travelModel({
      title,
      story,
      visitedLocation: visitedLocation || [],
      image: imageUrl,
      userId: req.user.toString(),
      isFavourite,
      visitedDate,
    });
    await newStory.save();
    return res.json({ error: false, message: "Added travel story", newStory });
  } catch (error) {
    console.log("Error in adding travel story", error);
    return res.json({ error: true, message: "Failed to add story" });
  }
};

const userTravelStory = async (req, res) => {
  try {
    const TravelStory = await travelModel
      .find({ userId: req.user })
      .sort({ createdAt: -1 });

    if (!TravelStory.length)
      return res.json({ error: true, message: "No story found" });

    return res.json({ error: false, TravelStory });
  } catch (error) {
    console.log("Error in userTravelstory", error);
    res.json({ error: true, message: "Failed to fetch the user story" });
  }
};

const editTravelStory = async (req, res) => {
  try {
    const { title, story, visitedLocation, visitedDate, isFavourite } =
      req.body;
    const storyId = req.params.storyId;

    const imageFile = req.file;

    let imageUrl = "";

    if (imageFile) {
      const image = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
        folder: "Story-Image",
      });
      imageUrl = image.secure_url;
    }
    const TravelStory = await travelModel.findById(storyId);
    if (!TravelStory)
      return res.json({ error: true, message: "No story found" });

    if (TravelStory.userId === req.user) {
      TravelStory.title = title || TravelStory.title;
      TravelStory.story = story || TravelStory.story;
      TravelStory.visitedLocation =
        visitedLocation || TravelStory.visitedLocation;
      TravelStory.visitedDate = visitedDate || TravelStory.visitedDate;
      TravelStory.isFavourite = isFavourite || TravelStory.isFavourite;
      TravelStory.image = imageUrl || TravelStory.image;

      const updatedStory = await TravelStory.save();
      return res.json({
        error: false,
        message: " Travel story Updated",
        updatedStory,
      });
    } else {
      return res.json({ error: true, message: "Failed to update your story" });
    }

    // console.log(TravelStory);
  } catch (error) {
    console.log("Error in editing travel story", error);
    return res.json({ error: true, message: "Failed to update your story" });
  }
};

const delTravelStory = async (req, res) => {
  try {
    const travelId = req.params.id;

    const travelStory = await travelModel.findById(travelId);

    if (!travelStory)
      return res.json({ error: true, message: "No story found" });
    if (travelStory.userId === req.user) {
      // await cloudinary.uploader.destroy(publicId);

      const story = await travelStory.deleteOne();
      return res.json({
        error: false,
        message: "Story deleted success",
        story,
      });
    } else {
      return res.json({ error: true, message: "Failed to delete story" });
    }
  } catch (error) {
    console.log("Error in deleting travel story", error);
    return res.json({ error: true, message: "Failed to delete story" });
  }
};

const updateIsFavourite = async (req, res) => {
  try {
    const travelId = req.params.storyId;
    const { isFavourite } = req.body;
    const travelStory = await travelModel.findById(travelId);

    if (!travelStory)
      return res.json({ error: true, message: "No story found" });

    if (travelStory.userId === req.user) {
      travelStory.isFavourite = isFavourite || travelStory.isFavourite;
      const newStory = await travelStory.save();
      return res.json({ error: false, message: "Updated story", newStory });
    }
  } catch (error) {
    console.log("Error in updating the isfavourite function", error);
    return res.json({ error: true, message: "Failed to update" });
  }
};

const searchTravelStory = async (req, res) => {
  try {
    const { query } = req.query;
    const searchedResults = await travelModel
      .find({
        $or: [
          {
            title: { $regex: query, $options: "i" },
            story: { $regex: query, $options: "i" },
            visitedLocation: { $regex: query, $options: "i" },
            visitedDate: { $regex: query, $options: "i" },
          },
        ],
      })
      .sort({ createdAt: 1 });

    if (searchedResults) return res.json({ error: false, searchedResults });
    else return res.json({ error: true, message: "No Result Found" });
  } catch (error) {
    console.log("Error in searching travel story", error);
    return res.json({ error: true, message: "failed to search the story" });
  }
};

const filterByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const filteredResult = await travelModel.find({
      visitedDate: { $gte: startDate, $lte: endDate },
    });
    if (filteredResult) return res.json({ error: false, filteredResult });
    else return res.json({ error: true, message: "No post found" });
  } catch (error) {
    console.log("Error in filtering through date", error);
    return res.json({ error: true, message: "falied to find" });
  }
};

module.exports = {
  addTravelStory,
  userTravelStory,
  editTravelStory,
  delTravelStory,
  updateIsFavourite,
  searchTravelStory,
  filterByDate,
};

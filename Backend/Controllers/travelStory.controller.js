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

module.exports = { addTravelStory };

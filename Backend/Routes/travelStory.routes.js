const express=require('express');
const travelRouter=express.Router();
const {addTravelStory}=require('../Controllers/travelStory.controller');
const authUser=require('../Middlewares/auth.user');

const upload=require('../Config/multer.config');

travelRouter.post('/add-story',authUser,upload.single('story-image'),addTravelStory);

module.exports=travelRouter;
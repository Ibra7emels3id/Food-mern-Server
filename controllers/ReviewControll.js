const Review = require("../models/Review");
const cloudinary = require('cloudinary').v2;

const AddReview = async (req, res) => {

    let pathToFile;
    
    if (req.body.image) {
        pathToFile = req.body.image
    }

    try {
        const { name, description, rating, email } = req.body;
        if (!name || !description || !rating || !email) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newReview = new Review({ name, description, rating, email, image: pathToFile });
        await newReview.save();
        res.status(201).json({ message: 'Review added successfully', review: newReview });
    } catch (error) {
        res.status(500).json({ message: 'Error adding review', error });
    }
}

// Get All Review
const GetAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({});
        res.json({ reviews });
    } catch (error) {
        res.status(500).json({ message: 'Error getting reviews', error });
    }
}

module.exports = {
    AddReview,
    GetAllReviews
};
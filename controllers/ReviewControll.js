const Review = require("../models/Review");

const AddReview = async (req, res) => {
    console.log(req.body);
    try {
        const { name, description, rating, email, image } = req.body;
        if (!name || !description || !rating || !email) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newReview = new Review({ name, description, rating, email, image });
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
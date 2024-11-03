const express = require('express');
const { AddReview, GetAllReviews } = require('../controllers/ReviewControll');
const upload = require('../MulterUploade/multer');

const ReviewRouterClint = express.Router();

// Mock data
ReviewRouterClint.post('/add-review' , upload.single('image') , AddReview)
ReviewRouterClint.get('/review' , GetAllReviews)



module.exports = ReviewRouterClint;
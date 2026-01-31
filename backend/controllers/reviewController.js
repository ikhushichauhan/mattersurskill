const Review = require('../models/Review');
const User = require('../models/User');

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private
const createReview = async (req, res) => {
  try {
    const { job, reviewee, rating, comment, reviewType } = req.body;

    // Check if review already exists
    const existingReview = await Review.findOne({
      job,
      reviewer: req.user._id
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this job' });
    }

    const review = await Review.create({
      job,
      reviewer: req.user._id,
      reviewee,
      rating,
      comment,
      reviewType,
    });

    // Update reviewee's rating
    const reviews = await Review.find({ reviewee });
    const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    await User.findByIdAndUpdate(reviewee, {
      rating: avgRating,
      reviewCount: reviews.length,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get reviews for a user
// @route   GET /api/reviews/:userId
// @access  Public
const getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ reviewee: req.params.userId })
      .populate('reviewer', 'name profilePicture')
      .populate('job', 'title')
      .sort({ createdAt: -1 });

    res.json({
      count: reviews.length,
      reviews
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get review by ID
// @route   GET /api/reviews/review/:id
// @access  Public
const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('reviewer', 'name profilePicture')
      .populate('reviewee', 'name')
      .populate('job', 'title');

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createReview,
  getUserReviews,
  getReviewById,
};

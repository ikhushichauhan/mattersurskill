const express = require('express');
const router = express.Router();
const {
  createReview,
  getUserReviews,
  getReviewById,
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createReview);
router.get('/:userId', getUserReviews);
router.get('/review/:id', getReviewById);

module.exports = router;

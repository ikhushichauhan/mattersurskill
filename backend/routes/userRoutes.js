const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  searchWorkers,
  getAllWorkers,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/workers', getAllWorkers);
router.get('/workers/search', searchWorkers);
router.get('/:id', getUserProfile);
router.put('/profile', protect, updateUserProfile);

module.exports = router;

const express = require('express');
const router = express.Router();
const {
  createConversation,
  getConversations,
  getConversation,
  sendMessage,
  markAsRead,
} = require('../controllers/conversationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createConversation)
  .get(protect, getConversations);

router.get('/:id', protect, getConversation);
router.post('/:id/messages', protect, sendMessage);
router.put('/:id/read', protect, markAsRead);

module.exports = router;

const asyncHandler = require('express-async-handler');
const Message = require('../models/Message');

// @desc    Create a contact message
// @route   POST /api/contact
// @access  Public
const createMessage = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error('Please fill in all fields');
  }

  const newMessage = await Message.create({ name, email, message });
  res.status(201).json({
    success: true,
    message: 'Message sent successfully',
    data: newMessage
  });
});

// @desc    Get all messages (admin only)
// @route   GET /api/contact
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});

module.exports = { createMessage, getMessages };

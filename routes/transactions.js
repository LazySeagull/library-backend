const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');

// Issue a book (student must be logged in)
router.post('/issue', authenticate, (req, res) => {
  res.json({ message: `Book issued to ${req.user.name}` });
});

// Return a book (student must be logged in)
router.post('/return', authenticate, (req, res) => {
  res.json({ message: `Book returned by ${req.user.name}` });
});

// Get user's transactions (student must be logged in)
router.get('/my', authenticate, (req, res) => {
  res.json({ message: `Transactions for ${req.user.name}` });
});

module.exports = router;

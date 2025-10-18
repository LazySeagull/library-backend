const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/authMiddleware');

// Public route (anyone can access)
router.get('/', (req, res) => {
  res.json({ message: 'Public: List of all books' });
});

// Protected route (must be logged in)
router.get('/my', authenticate, (req, res) => {
  res.json({ message: `Welcome ${req.user.name}, here are your borrowed books.` });
});

// Admin-only route
router.post('/add', authenticate, authorize(['admin', 'librarian']), (req, res) => {
  res.json({ message: `Book added by ${req.user.name}` });
});

module.exports = router;

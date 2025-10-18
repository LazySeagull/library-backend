const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');

// Public - anyone can view reviews
router.get('/', (req, res) => {
  res.json({ message: 'Public: List of all book reviews' });
});

// Logged-in users can add reviews
router.post('/', authenticate, (req, res) => {
  res.json({ message: `Review added by ${req.user.name}` });
});

module.exports = router;

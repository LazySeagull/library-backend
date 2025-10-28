const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const Review = require('../models/reviewModel');

// GET all reviews for a specific book (public)
router.get('/book/:bookId', async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId });
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});

// POST a new review (logged-in users only)
router.post('/', authenticate, async (req, res) => {
  try {
    const { bookId, rating, comment } = req.body;

    if (!bookId || !rating)
      return res.status(400).json({ message: 'Book ID and rating are required' });

    const review = await Review.create({
      bookId,
      userId: req.user.id,
      rating,
      comment,
    });

    res.status(201).json({ message: 'Review added successfully', review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding review' });
  }
});

// DELETE a review (admin only)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const result = await Review.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Review not found' });

    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting review' });
  }
});

module.exports = router;

/**
 * routes/reviews.js — real MongoDB version
 */
const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { Review } = require('../models/mongo'); // import from Mongoose model

// ✅ GET all reviews for a specific book (public)
router.get('/book/:bookId', async (req, res) => {
  try {
    const bookId = parseInt(req.params.bookId);
    const reviews = await Review.find({ book_id: bookId });
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ message: 'Server error while fetching reviews' });
  }
});

// ✅ POST a new review (must be logged in)
router.post('/', authenticate, async (req, res) => {
  try {
    const { bookId, rating, comment } = req.body;
    if (!bookId || !rating) {
      return res.status(400).json({ message: 'Book ID and rating are required' });
    }

    const newReview = await Review.create({
      user_id: req.user.id,
      book_id: bookId,
      rating,
      comment: comment || '',
    });

    res.status(201).json({
      message: 'Review added successfully',
      review: newReview,
    });
  } catch (err) {
    console.error('Error adding review:', err);
    res.status(500).json({ message: 'Server error while adding review' });
  }
});

// ✅ DELETE a review (admin only)
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const deleted = await Review.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error('Error deleting review:', err);
    res.status(500).json({ message: 'Server error while deleting review' });
  }
});

module.exports = router;

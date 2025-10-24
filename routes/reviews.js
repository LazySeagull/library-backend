const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const db = require('../utils/reviews_mock');

// GET all reviews for a book (public)
router.get('/book/:bookId', async (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const reviews = await db.getReviewsByBook(bookId);
  res.json(reviews);
});

// POST a new review (must be logged in)
router.post('/', authenticate, async (req, res) => {
  const { bookId, rating, comment } = req.body;

  if (!bookId || !rating) {
    return res.status(400).json({ message: 'Book ID and rating are required' });
  }

  const review = await db.addReview({
    userId: req.user.id,
    bookId,
    rating,
    comment: comment || '',
  });

  res.status(201).json({
    message: 'Review added successfully',
    review,
  });
});

// DELETE a review (admin only)
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
  const success = await db.deleteReview(parseInt(req.params.id));
  if (!success) return res.status(404).json({ message: 'Review not found' });

  res.json({ message: 'Review deleted successfully' });
});

module.exports = router;

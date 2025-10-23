const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const db = require('../utils/transactions_mock');

// POST /api/transactions/issue — user issues a book
router.post('/issue', authenticate, async (req, res) => {
  const { bookId } = req.body;
  if (!bookId) return res.status(400).json({ message: 'Book ID required' });

  const transaction = await db.issueBook({ userId: req.user.id, bookId });
  res.status(201).json({ message: 'Book issued successfully', transaction });
});

// POST /api/transactions/return — user returns a book
router.post('/return', authenticate, async (req, res) => {
  const { transactionId } = req.body;
  if (!transactionId) return res.status(400).json({ message: 'Transaction ID required' });

  const transaction = await db.returnBook(transactionId);
  if (!transaction) return res.status(404).json({ message: 'Transaction not found or already returned' });

  res.json({ message: 'Book returned successfully', transaction });
});

// GET /api/transactions/my — user views their own transactions
router.get('/my', authenticate, async (req, res) => {
  const myTransactions = await db.getUserTransactions(req.user.id);
  res.json(myTransactions);
});

// GET /api/transactions — admin/librarian view all
router.get('/', authenticate, authorize(['admin', 'librarian']), async (req, res) => {
  const all = await db.getAllTransactions();
  res.json(all);
});

module.exports = router;

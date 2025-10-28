// utils/transactions_mysql.js
const pool = require('../models/mysql');

// Issue a book (add a transaction)
async function issueBook({ userId, bookId }) {
  const [result] = await pool.query(
    'INSERT INTO transactions (user_id, book_id, status) VALUES (?, ?, "issued")',
    [userId, bookId]
  );

  const [rows] = await pool.query('SELECT * FROM transactions WHERE id = ?', [result.insertId]);
  return rows[0];
}

// Return a book (update transaction)
async function returnBook(transactionId) {
  const [result] = await pool.query(
    'UPDATE transactions SET status = "returned", return_date = NOW() WHERE id = ? AND status = "issued"',
    [transactionId]
  );

  if (result.affectedRows === 0) return null;

  const [rows] = await pool.query('SELECT * FROM transactions WHERE id = ?', [transactionId]);
  return rows[0];
}

// Get all transactions (admin/librarian)
async function getAllTransactions() {
  const [rows] = await pool.query('SELECT * FROM transactions');
  return rows;
}

// Get user’s transactions
async function getUserTransactions(userId) {
  const [rows] = await pool.query('SELECT * FROM transactions WHERE user_id = ?', [userId]);
  return rows;
}

module.exports = {
  issueBook,
  returnBook,
  getAllTransactions,
  getUserTransactions,
};

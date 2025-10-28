const pool = require('../models/mysql');

// Issue a new book
async function issueBook({ userId, bookId }) {
  const issueDate = new Date();
  const dueDate = new Date();
  dueDate.setDate(issueDate.getDate() + 14); // 2-week due date

  const [result] = await pool.query(
    `INSERT INTO transactions (user_id, book_id, issue_date, due_date, status)
     VALUES (?, ?, ?, ?, 'issued')`,
    [userId, bookId, issueDate, dueDate]
  );

  const [rows] = await pool.query(
    'SELECT * FROM transactions WHERE transaction_id = ?',
    [result.insertId]
  );
  return rows[0];
}

// Return a book
async function returnBook(transactionId) {
  const returnDate = new Date();
  const [rows] = await pool.query(
    'SELECT * FROM transactions WHERE transaction_id = ? AND status = "issued"',
    [transactionId]
  );
  if (!rows.length) return null;

  const transaction = rows[0];
  let fine = 0;

  // fine calculation: 10 currency units per overdue day
  const dueDate = new Date(transaction.due_date);
  if (returnDate > dueDate) {
    const diffDays = Math.ceil((returnDate - dueDate) / (1000 * 60 * 60 * 24));
    fine = diffDays * 10;
  }

  await pool.query(
    `UPDATE transactions
     SET return_date = ?, status = 'returned', fine = ?
     WHERE transaction_id = ?`,
    [returnDate, fine, transactionId]
  );

  const [updated] = await pool.query(
    'SELECT * FROM transactions WHERE transaction_id = ?',
    [transactionId]
  );
  return updated[0];
}

// View a user's transactions
async function getUserTransactions(userId) {
  const [rows] = await pool.query('SELECT * FROM transactions WHERE user_id = ?', [userId]);
  return rows;
}

// View all transactions (admin/librarian)
async function getAllTransactions() {
  const [rows] = await pool.query('SELECT * FROM transactions');
  return rows;
}

module.exports = { issueBook, returnBook, getUserTransactions, getAllTransactions };

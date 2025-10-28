const pool = require('../models/mysql');

// Find a user by email
async function findUserByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows.length ? rows[0] : null;
}

// Create a new user
async function createUser({ name, email, passwordHash, role }) {
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
    [name, email, passwordHash, role || 'student']
  );

  const [rows] = await pool.query('SELECT * FROM users WHERE user_id = ?', [result.insertId]);
  return rows[0];
}

module.exports = { findUserByEmail, createUser };

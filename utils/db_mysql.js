// utils/db_mysql.js
// MySQL-based user data layer matching the schema: users(id, name, email, password_hash, role, created_at)
const pool = require('../models/mysql');

/**
 * Find user by email
 * returns row object or null
 */
async function findUserByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows.length ? rows[0] : null;
}

/**
 * Create a new user.
 * Accepts { name, email, passwordHash, role }
 * Returns the inserted user row (with column names as in DB)
 */
async function createUser({ name, email, passwordHash, role = 'student' }) {
  // insert user
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
    [name, email, passwordHash, role]
  );

  // result.insertId refers to the auto-increment 'id' column in our schema
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
  return rows.length ? rows[0] : null;
}

/**
 * Optional convenience: find by id
 */
async function findUserById(id) {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows.length ? rows[0] : null;
}

module.exports = { findUserByEmail, createUser, findUserById };

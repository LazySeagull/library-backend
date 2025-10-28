// run from project root: node scripts/test_mysql.js
const pool = require('../models/mysql'); // path relative to project root
(async () => {
  try {
    const [rows] = await pool.query('SELECT 1+1 AS result');
    console.log('MySQL test OK:', rows);
    process.exit(0);
  } catch (err) {
    console.error('MySQL connection error:', err);
    process.exit(1);
  }
})();

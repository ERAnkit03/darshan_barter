const mysql = require('mysql2/promise');
require('dotenv').config();

// Check required environment variables
const required = ['DB_HOST', 'DB_USER', 'DB_NAME'];
required.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing required env variable: ${key}`);
    console.error('→ Check your backend/.env file');
  }
});

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'darshan_barter',

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  // Hostinger stability improvements
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Test database connection
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL Database Connected Successfully");
    connection.release();
  } catch (error) {
    console.error("❌ Database Connection Failed:", error.message);
  }
})();

module.exports = pool;

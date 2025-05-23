const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
  host: process.env.HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Database connected successfully!");
    connection.release();
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    console.log(
      "🔍 Trying to connect to DB at:",
      process.env.HOST,
      process.env.PORT
    );
  }
}

testConnection(); // Test saat file ini di-load

module.exports = pool;

const express = require("express");
const viteExpress = require("vite-express");
const bodyParser = require("body-parser");
const sqlite = require("sqlite3").verbose();
const url = require("url");
let sql;
const path = require("path");

const dbPath = path.resolve(__dirname, "../airbnb.db");
// Connect to SQLite database
const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE, (err) => {
  if (err) {
    console.error("Failed to connect to the database:", err.message);
    process.exit(1);
  }
  console.log("Connected to SQLite database");
});

const app = express();
// const app = viteExpress.app();
app.use(express.static(path.resolve(__dirname, "../public")));

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

app.get("/categories", (req, res) => {
  const sql = "SELECT * FROM categories";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Error fetching categories:", err.message);
      res.status(500).json({ success: false, error: err.message });
    } else {
      console.log("Categories fetched:", rows);
      res.json({ success: true, data: rows });
    }
  });
});

// Fetch rooms by category ID
app.get("/categories/:categoryId/rooms", (req, res) => {
  const { categoryId } = req.params || 1;
  const sql = `
    SELECT rooms.*
    FROM rooms
    INNER JOIN room_categories ON rooms.id = room_categories.room_id
    WHERE room_categories.category_id = ?;
  `;

  db.all(sql, [categoryId], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "No rooms found for this category" });
    }
    res.json({ success: true, data: rows });
  });
});

// Start the server using vite-express
viteExpress.listen(app, 3000, () => {
  console.log("Server is running on http://localhost:3000 with vite-express");
});

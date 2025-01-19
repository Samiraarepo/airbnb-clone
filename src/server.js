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

// POST /quote route
// app.post("/quote", (req, res) => {
//   try {
//     const { movie, quote, character } = req.body;
//     sql = "INSERT INTO quote(movie, quote, character) VALUES (?,?,?)";
//     db.run(sql, [movie, quote, character], (err) => {
//       if (err) {
//         return res.status(300).json({
//           status: 300,
//           success: false,
//           error: err.message,
//         });
//       }
//       console.log("Successful input: ", movie, quote, character);
//     });
//     return res.json({
//       status: 200,
//       success: true,
//     });
//   } catch (error) {
//     return res.json({
//       status: 400,
//       success: false,
//     });
//   }
// });

// Example route
// app.get("/quote", (req, res) => {
//   sql = "SELECT * FROM quote";
//   try {
//     const queryObject = url.parse(req.url, true).query; //query parameters
//     if (queryObject.field && queryObject.type)
//       sql += ` WHERE ${queryObject.field} LIKE '%${queryObject.type}%'`;
//     db.all(sql, [], (err, rows) => {
//       if (err)
//         return res
//           .status(300)
//           .json({ status: 300, success: false, error: err.message });

//       if (rows.length < 1)
//         return res
//           .status(300)
//           .json({ status: 300, success: false, error: "No match" });

//       return res.status(200).json({ status: 200, data: rows, success: true });
//     });
//   } catch (error) {
//     return res.json({
//       status: 400,
//       success: false,
//     });
//   }
// });

// *****Update for Category and Room APIs******

// Fetch all categories

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
  console.log(req.url);
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

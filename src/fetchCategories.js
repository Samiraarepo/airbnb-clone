const sqlite = require("sqlite3").verbose();

// Connect to the database
const db = new sqlite.Database("../airbnb.db", sqlite.OPEN_READWRITE, (err) => {
  if (err) {
    console.error("Failed to connect to the database:", err.message);
    process.exit(1); // Exit the process with an error code
  }
  console.log("Connected to the database.");
});

// Fetch all categories
const fetchCategories = () => {
  const sql = "SELECT * FROM categories";

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Error fetching categories:", err.message);
    } else {
      console.log("Categories:", rows);
    }
  });
};

fetchCategories();

// Fetch all room categories
const fetchRoomCategories = () => {
  const sql =
    "SELECT categories.* FROM categories INNER JOIN room_categories ON categories.id = room_categories.category_id WHERE room_categories.room_id = 1;"; //-- replace 1 with the desired room ID"
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Error fetching categories:", err.message);
    } else {
      console.log("Categories:", rows);
    }
  });
};

fetchRoomCategories();

// Fetch rooms by category
const fetchRoomsByCategory = (categoryId) => {
  const sql = `
    SELECT rooms.*
    FROM rooms
    INNER JOIN room_categories ON rooms.id = room_categories.room_id
    WHERE room_categories.category_id = ?;
  `;

  db.all(sql, [categoryId], (err, rows) => {
    if (err) {
      console.error("Error fetching rooms by category:", err.message);
    } else {
      console.log(`Rooms for category ${categoryId}:`, rows);
    }
  });
};

// Example Usage: Replace `1` with the desired category ID
fetchRoomsByCategory(1);

// Close the database connection
db.close((err) => {
  if (err) {
    console.error("Error closing the database:", err.message);
  } else {
    console.log("Database connection closed.");
  }
});

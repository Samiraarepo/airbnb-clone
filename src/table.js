const sqlite = require("sqlite3").verbose();

const db = new sqlite.Database("../airbnb.db", sqlite.OPEN_READWRITE, (err) => {
  if (err) return console.error(err);
  console.log("Connected to SQLite database.");
});

// Create tables
const createCategoriesTable = `
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    icon_url TEXT NOT NULL
  );
`;

const createRoomsTable = `
  CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    price_per_night REAL NOT NULL,
    images TEXT NOT NULL -- JSON string
  );
`;

const createRoomCategoriesTable = `
  CREATE TABLE IF NOT EXISTS room_categories (
    room_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms (id),
    FOREIGN KEY (category_id) REFERENCES categories (id),
    PRIMARY KEY (room_id, category_id)
  );
`;

// Run table creation queries
db.serialize(() => {
  db.run(createCategoriesTable, (err) => {
    if (err) console.error("Error creating categories table:", err.message);
    else console.log("Categories table created.");
  });

  db.run(createRoomsTable, (err) => {
    if (err) console.error("Error creating rooms table:", err.message);
    else console.log("Rooms table created.");
  });

  db.run(createRoomCategoriesTable, (err) => {
    if (err)
      console.error("Error creating room_categories table:", err.message);
    else console.log("Room-Categories relationship table created.");
  });
});

// Close database connection
db.close((err) => {
  if (err) return console.error(err.message);
  console.log("Closed SQLite database connection.");
});

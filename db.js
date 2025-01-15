import sqlite from "sqlite3";

const db = new sqlite.Database("./airbnb.db", sqlite.OPEN_READWRITE, (err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  }
});

const sqlCategory = `CREATE TABLE IF NOT EXISTS categories (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT NOT NULL,
       icon_url TEXT NOT NULL
    )`;
db.run(sqlCategory);

const sqlRoom = `
    CREATE TABLE IF NOT EXISTS rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      location TEXT NOT NULL,
      price_per_night REAL NOT NULL,
      images TEXT NOT NULL
    );
  `;

db.run(sqlRoom);

const categoryRoom = `CREATE TABLE IF NOT EXISTS category_room (
    category_id INTEGER NOT NULL,
    room_id INTEGER NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    PRIMARY KEY (category_id, room_id)
  )`;

db.run(categoryRoom);

console.log("All tables created (if not already existing).");
export default db;

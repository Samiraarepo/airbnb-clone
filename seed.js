const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("./quote.db", sqlite.OPEN_READWRITE, (err) => {
  if (err) return console.error(err);
  console.log("Connected to SQLite database for seeding.");
});

// Seed categories
const seedCategories = `
  INSERT INTO categories (name, icon_url)
  VALUES
  ('Beachfront', 'https://example.com/icons/beachfront.png'),
  ('Cabins', 'https://example.com/icons/cabins.png'),
  ('Luxury', 'https://example.com/icons/luxury.png');
`;

// Seed rooms
const seedRooms = `
  INSERT INTO rooms (name, location, price_per_night, images)
  VALUES
  ('Beach House', 'Malibu', 500, '["https://example.com/beach1.jpg","https://example.com/beach2.jpg"]'),
  ('Mountain Cabin', 'Aspen', 300, '["https://example.com/cabin1.jpg","https://example.com/cabin2.jpg"]');
`;

// Seed room-category relationships
const seedRoomCategories = `
  INSERT INTO room_categories (room_id, category_id)
  VALUES
  (1, 1), -- Beach House belongs to Beachfront
  (2, 2); -- Mountain Cabin belongs to Cabins
`;

db.serialize(() => {
  db.run(seedCategories, (err) => {
    if (err) console.error("Error seeding categories:", err.message);
    else console.log("Categories seeded.");
  });

  db.run(seedRooms, (err) => {
    if (err) console.error("Error seeding rooms:", err.message);
    else console.log("Rooms seeded.");
  });

  db.run(seedRoomCategories, (err) => {
    if (err) console.error("Error seeding room_categories:", err.message);
    else console.log("Room-Categories relationships seeded.");
  });
});

// Close database connection
db.close((err) => {
  if (err) return console.error(err.message);
  console.log("Seeding completed and database connection closed.");
});

const sqlite = require("sqlite3").verbose();

// Connect to the database
const db = new sqlite.Database("./quote.db", sqlite.OPEN_READWRITE, (err) => {
  if (err) {
    console.error("Failed to connect to the database:", err.message);
    process.exit(1); // Exit the process with an error code
  }
  console.log("Connected to the database.");
});

// Seed categories
const seedCategories = () => {
  const categories = [
    { name: "Beach", icon_url: "https://example.com/icons/beach.png" },
    { name: "Mountain", icon_url: "https://example.com/icons/mountain.png" },
    { name: "City", icon_url: "https://example.com/icons/city.png" },
  ];
  const checkTableExists = `SELECT name FROM sqlite_master WHERE type='table' AND name='categories';`;

  db.get(checkTableExists, (err, row) => {
    if (err) {
      console.error("Error checking if table exists:", err.message);
      return;
    }

    if (row) {
      console.log("Table 'categories' exists. Seeding data...");
      categories.forEach((category) => {
        const sql = "INSERT INTO categories (name, icon_url) VALUES (?, ?)";
        db.run(sql, [category.name, category.icon_url], (err) => {
          if (err) {
            console.error(
              `Error adding category "${category.name}":`,
              err.message
            );
          } else {
            console.log(`Category "${category.name}" added.`);
          }
        });
      });
    } else {
      console.error(
        "Table 'categories' does not exist. Please create the table first."
      );
    }
  });
};

// Run the seeding logic
seedCategories();

// Seed rooms
const seedRooms = () => {
  const rooms = [
    {
      name: "Sunny Beach Hut",
      location: "Miami",
      price: 120.5,
      images: JSON.stringify(["beach1.jpg", "beach2.jpg"]),
    },
    {
      name: "Mountain Cabin",
      location: "Aspen",
      price: 150.0,
      images: JSON.stringify(["mountain1.jpg", "mountain2.jpg"]),
    },
    {
      name: "City Apartment",
      location: "New York",
      price: 200.0,
      images: JSON.stringify(["city1.jpg", "city2.jpg"]),
    },
  ];

  rooms.forEach((room) => {
    const sql = `INSERT INTO rooms (name, location, price_per_night, images) VALUES (?, ?, ?, ?)`;
    db.run(sql, [room.name, room.location, room.price, room.images], (err) => {
      if (err) {
        console.error(`Error adding room "${room.name}":`, err.message);
      } else {
        console.log(`Room "${room.name}" added.`);
      }
    });
  });
};

// Seed room_categories (many-to-many relationships)
const seedRoomCategories = () => {
  const roomCategories = [
    { room_id: 1, category_id: 1 }, // "Sunny Beach Hut" -> "Beach"
    { room_id: 2, category_id: 2 }, // "Mountain Cabin" -> "Mountain"
    { room_id: 3, category_id: 3 }, // "City Apartment" -> "City"
    { room_id: 1, category_id: 3 }, // "Sunny Beach Hut" -> "City"
  ];

  roomCategories.forEach((entry) => {
    const sql = `INSERT INTO room_categories (room_id, category_id) VALUES (?, ?)`;
    db.run(sql, [entry.room_id, entry.category_id], (err) => {
      if (err) {
        console.error(
          `Error linking room ${entry.room_id} with category ${entry.category_id}:`,
          err.message
        );
      } else {
        console.log(
          `Linked room ${entry.room_id} with category ${entry.category_id}.`
        );
      }
    });
  });
};

// Run the seeding logic
db.serialize(() => {
  seedRooms();
  seedRoomCategories();
});

// Close the database connection after all queries
db.close((err) => {
  if (err) {
    console.error("Error closing the database:", err.message);
  } else {
    console.log("Database connection closed.");
  }
});

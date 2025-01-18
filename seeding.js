const { open } = require("sqlite");
const sqlite3 = require("sqlite3").verbose();

const categories = [
  {
    name: "Tiny homes",
    icon_url: "/images/icons/Tinyhomes.jpg",
  },
  {
    name: "Country side",
    icon_url: "/images/icons/Countryside.jpg",
  },
  {
    name: "Castles",
    icon_url: "/images/icons/Castles.jpg",
  },
  {
    name: "Barns",
    icon_url: "/images/icons/Barns.jpg",
  },

  {
    name: "Beachfronts",
    icon_url: "/images/icons/Beachfront.jpg",
  },
  {
    name: "Cabins",
    icon_url: "/images/icons/Cabins.jpg",
  },

  {
    name: "Lakefront",
    icon_url: "/images/icons/Lakefront.jpg",
  },
  {
    name: "OMG!",
    icon_url: "/images/icons/OMG!.jpg",
  },

  {
    name: "Ski-in/out",
    icon_url: "/images/icons/Ski-in-out.jpg",
  },
  {
    name: "Amazing pools",
    icon_url: "/images/icons/Amazing-pools.jpg",
  },
  {
    name: "Farms",
    icon_url: "/images/icons/Farms.jpg",
  },
  {
    name: "Tree houses",
    icon_url: "/images/icons/Treehouses.jpg",
  },
  {
    name: "Arctic",
    icon_url: "/images/icons/Arctic.jpg",
  },
  {
    name: "Design",
    icon_url: "/images/icons/Design.jpg",
  },
  {
    name: "Historical homes",
    icon_url: "/images/icons/Historicalhomes.jpg",
  },
  {
    name: "Houseboats",
    icon_url: "/images/icons/Houseboats.jpg",
  },
  {
    name: "Islands",
    icon_url: "/images/icons/Islands.jpg",
  },
  {
    name: "Lake front",
    icon_url: "/images/icons/Lakefront.jpg",
  },
  {
    name: "Luxe",
    icon_url: "/images/icons/Luxe.jpg",
  },
  {
    name: "Mansions",
    icon_url: "/images/icons/Mansions.jpg",
  },
  {
    name: "National parks",
    icon_url: "/images/icons/Nationalparks.jpg",
  },
  {
    name: "Off-the-grid",
    icon_url: "/images/icons/Off-the-grid.jpg",
  },
  {
    name: "Topcities",
    icon_url: "/images/icons/Topcities.jpg",
  },
  {
    name: "Trending",
    icon_url: "/images/icons/Trending.jpg",
  },
  {
    name: "Treehouses",
    icon_url: "/images/icons/Tropical.jpg",
  },
];
console.log(categories.icon_url);

const rooms = [
  {
    name: "Ocean View Suite",
    location: "Miami Beach, FL",
    price_per_night: 200,
    images: ["ocean_view.jpg", "suite.jpg"],
  },
  {
    name: "Mountain Cabin",
    location: "Aspen, CO",
    price_per_night: 150,
    images: ["mountain_cabin.jpg"],
  },
  {
    name: "City Apartment",
    location: "New York, NY",
    price_per_night: 300,
    images: ["city_apartment.jpg"],
  },
  {
    name: "Lakefront Cottage",
    location: "Lake Tahoe, CA",
    price_per_night: 180,
    images: ["lakefront_cottage.jpg"],
  },
  {
    name: "Luxury Villa",
    location: "Beverly Hills, CA",
    price_per_night: 500,
    images: ["luxury_villa.jpg"],
  },
  {
    name: "Desert Retreat",
    location: "Sedona, AZ",
    price_per_night: 120,
    images: ["desert_retreat.jpg"],
  },
  {
    name: "Beach Bungalow",
    location: "Honolulu, HI",
    price_per_night: 250,
    images: ["beach_bungalow.jpg"],
  },
  {
    name: "Ski Chalet",
    location: "Park City, UT",
    price_per_night: 300,
    images: ["ski_chalet.jpg"],
  },
  {
    name: "Historic Inn",
    location: "Charleston, SC",
    price_per_night: 140,
    images: ["historic_inn.jpg"],
  },
  {
    name: "Countryside Cottage",
    location: "Napa Valley, CA",
    price_per_night: 160,
    images: ["countryside_cottage.jpg"],
  },
  {
    name: "Modern Loft",
    location: "Seattle, WA",
    price_per_night: 220,
    images: ["modern_loft.jpg"],
  },
  {
    name: "Rustic Barn",
    location: "Lancaster, PA",
    price_per_night: 100,
    images: ["rustic_barn.jpg"],
  },
];

// Create categories table
const createCategoriesTable = async (db) => {
  const tableExists = await db.get(
    `SELECT name FROM sqlite_master WHERE type='table' AND name='categories';`
  );

  if (!tableExists) {
    await db.run(`
      CREATE TABLE categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        icon_url TEXT
      );
    `);
    console.log("Categories table created.");
  }
};

// Create rooms table
const createRoomsTable = async (db) => {
  const tableExists = await db.get(
    `SELECT name FROM sqlite_master WHERE type='table' AND name='rooms';`
  );

  if (!tableExists) {
    await db.run(`
      CREATE TABLE rooms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        location TEXT,
        price_per_night INTEGER NOT NULL,
        images TEXT
      );
    `);
    console.log("Rooms table created.");
  }
};

// Create room_categories table (to assign rooms to categories)
const createRoomCategoriesTable = async (db) => {
  const tableExists = await db.get(
    `SELECT name FROM sqlite_master WHERE type='table' AND name='room_categories';`
  );

  if (!tableExists) {
    await db.run(`
      CREATE TABLE room_categories (
        room_id INTEGER,
        category_id INTEGER,
        FOREIGN KEY (room_id) REFERENCES rooms(id),
        FOREIGN KEY (category_id) REFERENCES categories(id),
        PRIMARY KEY (room_id, category_id)
      );
    `);
    console.log("Room categories table created.");
  }
};

// Open the database connection
const openDb = async () => {
  try {
    const db = await open({
      filename: "./quote.db",
      driver: sqlite3.Database,
    });
    console.log("Connected to the database.");
    return db;
  } catch (err) {
    console.error("Failed to connect to the database:", err.message);
    process.exit(1);
  }
};

// Seed categories (insert or update)
const seedCategories = async (db) => {
  const tableExists = await db.get(
    `SELECT name FROM sqlite_master WHERE type='table' AND name='categories';`
  );

  if (!tableExists) {
    console.error(
      "Table 'categories' does not exist. Please create the table first."
    );
    return;
  }

  for (const category of categories) {
    const exists = await db.get(`SELECT id FROM categories WHERE name = ?`, [
      category.name,
    ]);
    if (exists) {
      await db.run(`UPDATE categories SET icon_url = ? WHERE id = ?`, [
        category.icon_url,
        exists.id,
      ]);
      console.log(`Category "${category.name}" updated.`);
    } else {
      await db.run(`INSERT INTO categories (name, icon_url) VALUES (?, ?)`, [
        category.name,
        category.icon_url,
      ]);
      console.log(`Category "${category.name}" added.`);
    }
  }
};

// Seed rooms (insert or update)
const seedRooms = async (db) => {
  for (const room of rooms) {
    const exists = await db.get(`SELECT id FROM rooms WHERE name = ?`, [
      room.name,
    ]);
    if (exists) {
      await db.run(
        `UPDATE rooms SET location = ?, price_per_night = ?, images = ? WHERE id = ?`,
        [room.location, room.price_per_night, room.images, exists.id]
      );
      console.log(`Room "${room.name}" updated.`);
    } else {
      await db.run(
        `INSERT INTO rooms (name, location, price_per_night, images) VALUES (?, ?, ?, ?)`,
        [room.name, room.location, room.price_per_night, room.images]
      );
      console.log(`Room "${room.name}" added.`);
    }
  }
};

// Seed room_categories (randomly assign rooms to categories)
const seedRoomCategories = async (db) => {
  const rooms = await db.all(`SELECT id FROM rooms`);
  const categories = await db.all(`SELECT id FROM categories`);

  if (rooms.length === 0 || categories.length === 0) {
    console.error(
      "Cannot assign room categories: Ensure both rooms and categories exist."
    );
    return;
  }

  for (const room of rooms) {
    // Remove existing assignments for the room
    await db.run(`DELETE FROM room_categories WHERE room_id = ?`, [room.id]);

    // Assign to a random category
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    await db.run(
      `INSERT INTO room_categories (room_id, category_id) VALUES (?, ?)`,
      [room.id, randomCategory.id]
    );
    console.log(`Room ${room.id} assigned to category ${randomCategory.id}.`);
  }
};

// Main function to run seeding
const main = async () => {
  const db = await openDb();

  try {
    await createCategoriesTable(db);
    await createRoomsTable(db);
    await createRoomCategoriesTable(db);

    await seedCategories(db);
    await seedRooms(db);
    await seedRoomCategories(db);
  } catch (err) {
    console.error("Error during seeding:", err.message);
  } finally {
    await db.close();
    console.log("Database connection closed.");
  }
};

main();

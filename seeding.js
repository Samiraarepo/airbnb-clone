import sqlite3 from "sqlite3";
import { open } from "sqlite";

const categories_ = [
  {
    name: "Tiny homes",
    icon_url: "/images/Icon/Tinyhomes.jpg",
  },
  {
    name: "Country side",
    icon_url: "/images/Icon/Countryside.jpg",
  },
  {
    name: "Castles",
    icon_url: "/images/Icon/Castles.jpg",
  },
  {
    name: "Barns",
    icon_url: "/images/Icon/Barns.jpg",
  },

  {
    name: "Beachfronts",
    icon_url: "/images/Icon/Beachfront.jpg",
  },
  {
    name: "Cabins",
    icon_url: "/images/Icon/Cabins.jpg",
  },

  {
    name: "Lakefront",
    icon_url: "/images/Icon/Lakefront.jpg",
  },
  {
    name: "OMG!",
    icon_url: "/images/Icon/OMG!.jpg",
  },

  {
    name: "Ski-in/out",
    icon_url: "/images/Icon/Ski-in-out.jpg",
  },
  {
    name: "Amazing pools",
    icon_url: "/images/Icon/Amazing-pools.jpg",
  },
  {
    name: "Farms",
    icon_url: "/images/Icon/Farms.jpg",
  },
  {
    name: "Tree houses",
    icon_url: "/images/Icon/Treehouses.jpg",
  },
  {
    name: "Arctic",
    icon_url: "/images/Icon/Arctic.jpg",
  },
  {
    name: "Design",
    icon_url: "/images/Icon/Design.jpg",
  },
  {
    name: "Historical homes",
    icon_url: "/images/Icon/Historicalhomes.jpg",
  },
  {
    name: "Houseboats",
    icon_url: "/images/Icon/Houseboats.jpg",
  },
  {
    name: "Islands",
    icon_url: "/images/Icon/Islands.jpg",
  },
  {
    name: "Lake front",
    icon_url: "/images/Icon/Lakefront.jpg",
  },
  {
    name: "Luxe",
    icon_url: "/images/Icon/Luxe.jpg",
  },
  {
    name: "Mansions",
    icon_url: "/images/Icon/Mansions.jpg",
  },
  {
    name: "National parks",
    icon_url: "/images/Icon/Nationalparks.jpg",
  },
  {
    name: "Off-the-grid",
    icon_url: "/images/Icon/Off-the-grid.jpg",
  },
  {
    name: "Topcities",
    icon_url: "/images/Icon/Topcities.jpg",
  },
  {
    name: "Trending",
    icon_url: "/images/Icon/Trending.jpg",
  },
  {
    name: "Treehouses",
    icon_url: "/images/Icon/Tropical.jpg",
  },
  {
    name: "Icon",
    icon_url: "/images/Icon/icons.webp",
  },
  {
    name: "Amazingviews",
    icon_url: "/images/Icon/Amazingviews.jpg",
  },
];

const rooms_ = [
  {
    name: "Ocean View Suite",
    location: "Miami Beach, FL",
    price_per_night: 200,
    images: [
      "/images/pics/sample1.jpg",
      "/images/pics/sample2.jpg",
      "/images/pics/sample1.jpg",
      "/images/pics/sample2.jpg",
    ],
  },
  {
    name: "Mountain Cabin",
    location: "Aspen, CO",
    price_per_night: 150,
    images: [
      "/images/pics/sample3.jpg",
      "/images/pics/sample1.jpg",
      "/images/pics/sample2.jpg",
    ],
  },
  {
    name: "City Apartment",
    location: "New York, NY",
    price_per_night: 300,
    images: ["/images/pics/sample4.jpg"],
  },
  {
    name: "Lakefront Cottage",
    location: "Lake Tahoe, CA",
    price_per_night: 180,
    images: ["/images/pics/sample1.jpeg"],
  },
  {
    name: "Luxury Villa",
    location: "Beverly Hills, CA",
    price_per_night: 500,
    images: ["/images/pics/sample1.jpg", "/images/pics/sample2.jpg"],
  },
  {
    name: "Desert Retreat",
    location: "Sedona, AZ",
    price_per_night: 120,
    images: [
      "/images/pics/sample3.jpg",
      "/images/pics/sample4.jpg",
      "/images/pics/sample3.jpg",
      "/images/pics/sample4.jpg",
    ],
  },
  {
    name: "Beach Bungalow",
    location: "Honolulu, HI",
    price_per_night: 250,
    images: ["/images/pics/sample3.jpg", "/images/pics/sample4.jpg"],
  },
  {
    name: "Ski Chalet",
    location: "Park City, UT",
    price_per_night: 300,
    images: ["/images/pics/sample3.jpg", "/images/pics/sample4.jpg"],
  },
  {
    name: "Historic Inn",
    location: "Charleston, SC",
    price_per_night: 140,
    images: ["/images/pics/sample3.jpg", "/images/pics/sample4.jpg"],
  },
  {
    name: "Countryside Cottage",
    location: "Napa Valley, CA",
    price_per_night: 160,
    images: ["/images/pics/sample3.jpg", "/images/pics/sample4.jpg"],
  },
  {
    name: "Modern Loft",
    location: "Seattle, WA",
    price_per_night: 220,
    images: ["/images/pics/sample3.jpg", "/images/pics/sample4.jpg"],
  },
  {
    name: "Rustic Barn",
    location: "Lancaster, PA",
    price_per_night: 100,
    images: ["/images/pics/sample3.jpg", "/images/pics/sample4.jpg"],
  },
  {
    name: "Ocean View Suite",
    location: "Miami Beach, FL",
    price_per_night: 200,
    images: [
      "/images/pics/sample1.jpg",
      "/images/pics/sample2.jpg",
      "/images/pics/sample1.jpg",
      "/images/pics/sample2.jpg",
    ],
  },
  {
    name: "Mountain Cabin",
    location: "Aspen, CO",
    price_per_night: 150,
    images: [
      "/images/pics/sample3.jpg",
      "/images/pics/sample1.jpg",
      "/images/pics/sample2.jpg",
    ],
  },
  {
    name: "City Apartment",
    location: "New York, NY",
    price_per_night: 300,
    images: ["/images/pics/sample4.jpg"],
  },
  {
    name: "Lakefront Cottage",
    location: "Lake Tahoe, CA",
    price_per_night: 180,
    images: ["/images/pics/sample1.jpeg"],
  },
  {
    name: "Luxury Villa",
    location: "Beverly Hills, CA",
    price_per_night: 500,
    images: ["/images/pics/sample1.jpg", "/images/pics/sample2.jpg"],
  },
  {
    name: "Desert Retreat",
    location: "Sedona, AZ",
    price_per_night: 120,
    images: [
      "/images/pics/sample3.jpg",
      "/images/pics/sample4.jpg",
      "/images/pics/sample3.jpg",
      "/images/pics/sample4.jpg",
    ],
  },
  {
    name: "Beach Bungalow",
    location: "Honolulu, HI",
    price_per_night: 250,
    images: ["/images/pics/sample3.jpg", "/images/pics/sample4.jpg"],
  },
  {
    name: "Ski Chalet",
    location: "Park City, UT",
    price_per_night: 300,
    images: ["/images/pics/sample3.jpg", "/images/pics/sample4.jpg"],
  },
  {
    name: "Historic Inn",
    location: "Charleston, SC",
    price_per_night: 140,
    images: ["/images/pics/sample3.jpg", "/images/pics/sample4.jpg"],
  },
  {
    name: "Countryside Cottage",
    location: "Napa Valley, CA",
    price_per_night: 160,
    images: ["/images/pics/sample3.jpg", "/images/pics/sample4.jpg"],
  },
  {
    name: "Modern Loft",
    location: "Seattle, WA",
    price_per_night: 220,
    images: ["/images/pics/sample3.jpg", "/images/pics/sample4.jpg"],
  },
  {
    name: "Rustic Barn",
    location: "Lancaster, PA",
    price_per_night: 100,
    images: ["/images/pics/sample3.jpg", "/images/pics/sample4.jpg"],
  },
];
console.log(rooms_);
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
      filename: "./airbnb.db",
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
  const categories = categories_;

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
  const rooms = rooms_;
  for (const room of rooms) {
    const exists = await db.get(`SELECT id FROM rooms WHERE name = ?`, [
      room.name,
    ]);
    if (exists) {
      await db.run(
        `UPDATE rooms SET location = ?, price_per_night = ?, images = ? WHERE id = ?`,
        [
          room.location,
          room.price_per_night,
          JSON.stringify(room.images),
          exists.id,
        ]
      );
      console.log(`Room "${room.name}" updated.`);
    } else {
      await db.run(
        `INSERT INTO rooms (name, location, price_per_night, images) VALUES (?, ?, ?, ?)`,
        [
          room.name,
          room.location,
          room.price_per_night,
          JSON.stringify(room.images),
        ]
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

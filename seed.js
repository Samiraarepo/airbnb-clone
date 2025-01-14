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

  categories.forEach((category) => {
    const sql = "INSERT INTO categories (name, icon_url) VALUES (?, ?)";
    db.run(sql, [category.name, category.icon_url], (err) => {
      if (err) {
        console.error(`Error adding category "${category.name}":`, err.message);
      } else {
        console.log(`Category "${category.name}" added.`);
      }
    });
  });
};

// Run the seeding logic
seedCategories();

// Close the database connection after all queries
db.close((err) => {
  if (err) {
    console.error("Error closing the database:", err.message);
  } else {
    console.log("Database connection closed.");
  }
});

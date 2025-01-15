import db from "../db.js";
//get all categories
export const getAllCategories = (req, res) => {
  db.all("SELECT * FROM categories", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

//create new category
export const createCategory = (req, res) => {
  const { name, icon_url } = req.body;

  const query = `INSERT INTO categories (name, icon_url) VALUES (?,?)`;
  db.run(query, [name, icon_url], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, name, icon_url });
  });
};

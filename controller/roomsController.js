import db from "../db.js";

export const getRoomsByCategory = (req, res) => {
  const categoryId = req.params.categoryId;

  const query = `SELECT * FROM rooms
INNER JOIN room_categories ON rooms.id = room_categories.room_id
WHERE room_categories.category_id = ?`;

  db.all(query, [categoryId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log(rows);

    res.json(rows);
  });
};

//create new room and add it relation to other categories
export const createRoom = (req, res) => {
  const { name, location, price_per_night, images, categoryIds } = req.body;
  const imagesJSON = JSON.stringify(images); //change urls array to json

  const queryRoom = `
    INSERT INTO rooms (name, location, price_per_night, images)
    VALUES (?, ?, ?, ?)
  `;

  //save new room information
  db.run(
    queryRoom,
    [name, location, price_per_night, imagesJSON],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const roomId = this.lastID;
      const categoryRoomQueries = categoryIds.map((categoryId) => {
        return new Promise((resolve, reject) => {
          const queryCategoryRoom = `
          INSERT INTO room_categories (category_id, room_id)
          VALUES (?, ?)
        `;
          db.run(queryCategoryRoom, [categoryId, roomId], function (err) {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      });
      //when all relations are save we response
      Promise.all(categoryRoomQueries)
        .then(() => {
          res
            .status(201)
            .json({ id: roomId, name, location, price_per_night, images });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    }
  );
};
export default { createRoom, getRoomsByCategory };

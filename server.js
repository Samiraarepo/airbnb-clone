const express = require("express");
const viteExpress = require("vite-express");

const bodyParser = require("body-parser");

const app = express();
const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("./quote.db", sqlite.OPEN_READWRITE, (err) => {
  if (err) return console.error(err);
});
app.use(bodyParser.json());

// Example route
app.get("/api/hello", (req, res) => {
  res.send("Hello from express!");
});

app.get("/api/greet", (req, res) => {
  res.json({ message: "Greetings from another Express route!" });
});

// app.post("/api/data", (req, res) => {
//   res.send("Data received!");
// });

// Post request
app.post("/quote", (req, res) => {
  try {
    console.log(request.body.movie);
    res.json({ status: 200, success: true });
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
    });
  }
});
viteExpress.listen(app, 3000, () => {
  console.log("Server is running with vite-express");
});

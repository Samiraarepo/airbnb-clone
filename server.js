const express = require("express");
const viteExpress = require("vite-express");

const app = express();

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
viteExpress.listen(app, 3000, () => {
  console.log("Server is running with vite-express");
});

const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.all("*", (req, res) => {
  res.send("<h1>Resource not found</h1>");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

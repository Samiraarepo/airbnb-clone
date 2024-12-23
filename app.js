import express from "express";

const app = express();

// setup static middleware
app.use(express.static("./public"));
app.use(express.static("./public/fonts"));
app.use(express.static("./public/icons"));
app.use(express.static("./public/images"));

app.all("*", (req, res) => {
  res.status(404).send("<h1>❌ Page not found!❌</h1>");
});

app.listen("3000", () => {
  console.log("Airbnb runing on 3000 port");
});

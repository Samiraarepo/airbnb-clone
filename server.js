import express from "express";
import ViteExpress from "vite-express";
import categoriesRouter from "./routes/categories.js";
import roomsRouter from "./routes/rooms.js";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json());

app.use("/api/categories", categoriesRouter);
app.use("/api/rooms", roomsRouter);

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));

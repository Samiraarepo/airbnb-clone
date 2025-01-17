import express from "express";
import ViteExpress from "vite-express";
import categoriesRouter from "./routes/categories.js";
import roomsRouter from "./routes/rooms.js";

const app = express();
app.use(express.json());

app.use(express.static("public"));
app.use("/api/categories", categoriesRouter);
app.use("/api/rooms", roomsRouter);

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));

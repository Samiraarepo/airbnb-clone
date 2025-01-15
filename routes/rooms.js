import express from "express";
import roomsController from "../controller/roomsController.js";

const router = express.Router();

//rout for receive rooms base on categoryId
router.get("/:categoryId", roomsController.getRoomsByCategory);
//route for create new room
router.post("/", roomsController.createRoom);
export default router;

import express from "express";
import {
  getAllCategories,
  createCategory,
} from "../controller/categoriesController.js";

const router = express.Router();
//route for receieve all categories
router.get("/", getAllCategories);
//route for create a new category
router.post("/", createCategory);
export default router;

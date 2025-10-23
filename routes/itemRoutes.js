import express from "express";
import {
  createItem, //importing functions from items.js
  getAllItems,
  getItemsByCategory,
  getItemsBySubcategory,
  getItemByIdOrName,
  updateItem,
  searchItemByName,
} from "../Controllers/items.js";

const router = express.Router(); //creating router instance

//routes and linking to respective controller functions

router.post("/", createItem);
router.get("/", getAllItems);
router.get("/category/:categoryId", getItemsByCategory);
router.get("/subcategory/:subcategoryId", getItemsBySubcategory);
router.get("/search", searchItemByName);
router.get("/:idOrName", getItemByIdOrName);
router.put("/:id", updateItem);

export default router;

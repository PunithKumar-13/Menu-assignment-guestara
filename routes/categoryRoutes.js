import express from "express";
import { //importing functions from categoryController.js
  createCategory,
  getAllCategories,
  getCategoryByIdOrName,
  updateCategory,
} from "../Controllers/categoryController.js";

const router = express.Router(); //creating router instance

//routes and linking to respective controller functions
 
router.post("/", createCategory);
router.get("/", getAllCategories);
router.get("/:idOrName", getCategoryByIdOrName);
router.put("/:id", updateCategory);


export default router;

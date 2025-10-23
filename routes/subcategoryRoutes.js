import express from "express";

import {
  createSubcategory, //importing functions from subcategoryController.js
  getAllSubcategories,
  getSubcategoriesByCategory,
  getSubcategoryByIdOrName,
  updateSubcategory,
} from "../Controllers/subcategoryController.js";

const router = express.Router(); //creating router instance

//routes and linking to respective controller functions

router.post("/", createSubcategory);
router.get("/", getAllSubcategories);
router.get("/category/:categoryId", getSubcategoriesByCategory);
router.get("/:idOrName", getSubcategoryByIdOrName);
router.put("/:id", updateSubcategory);

export default router;

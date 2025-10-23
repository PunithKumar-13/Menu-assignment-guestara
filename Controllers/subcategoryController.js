import Subcategory from "../modals/Subcategory.js";
import Category from "../modals/Category.js";
import mongoose from "mongoose";

// async function to create a new subcategory
export const createSubcategory = async (req, res) => {
  try {
    const { categoryId, name, image, description, taxApplicability, tax } =
      req.body;

    //inorder to create subcategory, first validate the category exists

    const category = await Category.findById(categoryId); //fetch category by ID
    if (!category) 
      return res.status(404).json({ message: "Category not found" }); //if not found, print error

    const subcategory = new Subcategory({ //create new subcategory instance with all requirements
      category: categoryId,
      name,
      image,
      description,
      taxApplicability: taxApplicability ?? category.taxApplicability,
      tax: tax ?? category.tax,
    });

    await subcategory.save();
    res.status(201).json({ message: "Subcategory created Sucessfully" , subcategory });

  }
   catch (error)
  {
    res.status(400).json({ message: error.message });
  }
};

// get all the subcategories
export const getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate("category"); //get  category details
    res.status(200).json(subcategories);  
  }
  catch (error) 
  {
    res.status(500).json({ message: error.message });
  }
};

// function to get Subcategories under a Category
export const getSubcategoriesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params; //extract categoryId from request parameters

    const subcategories = await Subcategory.find({ category: categoryId }); //find subcategories with matching categoryId
    res.json(subcategories);
  } 
  catch (error) 
  {
    res.status(500).json({ message: error.message }); //if not found, print error
  }
};

// function to get subcategory by ID or name
export const getSubcategoryByIdOrName = async (req, res) => {
  try {
    const { idOrName } = req.params;
    let subcategory;

    if (mongoose.Types.ObjectId.isValid(idOrName)) { //check if valid ObjectId
      subcategory = await Subcategory.findById(idOrName).populate("category");
    }

    if (!subcategory) { //check by name if not found by ID
      subcategory = await Subcategory.findOne({ name: idOrName }).populate("category");
    }

    if (!subcategory) return res.status(404).json({ message: "Not found" });

    res.json(subcategory);
  } 
  catch (error)  //if not found, print error
  {
    res.status(500).json({ message: error.message });
  }
};

// function to Update Subcategory
export const updateSubcategory = async (req, res) => {
  try {
    const { id } = req.params; //extract id from request parameters

    const subcategory = await Subcategory.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("category"); //update subcategory with new data

    if (!subcategory) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Subcategory updated sucessfully", subcategory });
  }
  catch (error)
  {
    res.status(500).json({ message: error.message });
  }
};

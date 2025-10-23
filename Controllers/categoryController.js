import Category from "../modals/Category.js";
import mongoose from "mongoose";

//function to create a new category

export const createCategory = async (req, res) => {   //async function to handle request and response
  try {
    const category = new Category(req.body);  //create new category instance

    await category.save();                            //save to database
    res.status(201).json({ message: "Category created Successfully", category });   //send response
  }
   catch (error) 
   {
    res.status(400).json({ message: error.message }); //catch errors
  }
};

//function to get all categories
export const getAllCategories = async (req, res) => { //async function to handle request and response
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } 
  catch (error) 
  {
    res.status(500).json({ message: error.message });
  }
};

//function to get category by ID or name
export const getCategoryByIdOrName = async (req, res) => {
  try {
    const { idOrName } = req.params; //extract parameter from request
    let category;

    
    if (mongoose.Types.ObjectId.isValid(idOrName)) {
      category = await Category.findById(idOrName);
    } 
    
    
    if (!category) {
      category = await Category.findOne({ name: idOrName });
    }

    if (!category) return res.status(404).json({ message: " Category Not found" });

    res.json(category);
  }
   catch (error)
  {
    res.status(500).json({ message: error.message });
  }
};


//function to update category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!category) 
      return res.status(404).json({ message: " Category Not found" });

    res.json({ message: "Category updated Sucessfully", category });
  }
   catch (error)
  {
    res.status(500).json({ message: error.message });
  }
};



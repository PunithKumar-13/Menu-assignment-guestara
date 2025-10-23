import mongoose from "mongoose";
import Item from "../modals/Item.js";
import Category from "../modals/Category.js";
import Subcategory from "../modals/Subcategory.js";

// function to Create Item
export const createItem = async (req, res) => { 
  try {
    const {
      categoryId,
      subcategoryId,
      name,
      image,
      description,
      taxApplicability,
      tax,
      baseAmount,
      discount,
    } = req.body;

    // Validate Category for the item
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ message: "Category not found" });

    // Validate Subcategory for the item if provided
    let subcategory = null;
    if (subcategoryId) {
      subcategory = await Subcategory.findById(subcategoryId);
      if (!subcategory)
        return res.status(404).json({ message: "Subcategory not found" });
    }

    const item = new Item({ //create new item instance with all requirements
      category: categoryId,
      subcategory: subcategoryId || null,
      name,
      image,
      description,
      taxApplicability: taxApplicability ?? (subcategory?.taxApplicability ?? category.taxApplicability),
      tax: tax ?? (subcategory?.tax ?? category.tax),
      baseAmount,
      discount: discount || 0,
      totalAmount: baseAmount - (discount || 0),
    });

    await item.save();
    res.status(201).json({ message: "Item created", item });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// function to Get All Items
export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate("category").populate("subcategory");
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//function to  Get Items by Category
export const getItemsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const items = await Item.find({ category: categoryId }).populate("subcategory");
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// function to Get Items by Subcategory
export const getItemsBySubcategory = async (req, res) => {
  try {
    const { subcategoryId } = req.params;
    const items = await Item.find({ subcategory: subcategoryId }).populate("category");
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// function to Get Item by ID or Name
export const getItemByIdOrName = async (req, res) => {
  try {
    const { idOrName } = req.params;
    let item;

    if (mongoose.Types.ObjectId.isValid(idOrName)) {
      item = await Item.findById(idOrName).populate("category").populate("subcategory");
    }

    if (!item) {
      item = await Item.findOne({ name: idOrName }).populate("category").populate("subcategory");
    }

    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// function to Update Item
export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByIdAndUpdate(id, req.body, { new: true })
      .populate("category")
      .populate("subcategory");

    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item updated", item });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  function to Search Item by Name
export const searchItemByName = async (req, res) => {
  try {
    const { name } = req.query;
    const items = await Item.find({ name: { $regex: name, $options: "i" } })
      .populate("category")
      .populate("subcategory");
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

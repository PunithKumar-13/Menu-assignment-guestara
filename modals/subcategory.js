import mongoose from "mongoose";

const newSubcategory= new mongoose.Schema(  // object structure for subcategory
  {
    category: {          //category reference for the subcategory
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    name: {
      type: String,
      required: true,   //subcategory name
      trim: true,
    },
    image: {
      type: String,   //image subcategory
    },
    description: {
      type: String,
    },
    taxApplicability: {
      type: Boolean,
      default: null, // if null, will use parent Category tax
    },
    tax: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Subcategory", newSubcategory);

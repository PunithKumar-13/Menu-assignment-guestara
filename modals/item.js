import mongoose from "mongoose";


const newItem = new mongoose.Schema( // object structure for item
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,  //category reference for the item
      ref: "Category",
      required: true, 
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId, //subcategory reference for the item
      ref: "Subcategory",
      default: null,
    },
    name: {                 //item name
      type: String,
      required: true,
      trim: true,
    },  
    image: {                  //item image
      type: String,
    },
    description: {
      type: String,
    },
    taxApplicability: {
      type: Boolean,
      default: null, // if null, use category/subcategory tax
    },
    tax: {
      type: Number,
      default: null,
    },
    baseAmount: {
      type: Number,    //base price of the item
      required: true,
    }, 
    discount: {
      type: Number,         //discount on the item
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,          //total price after discount which is baseAmount - discount
    },
  },
  { timestamps: true }
);

export default mongoose.model("Item", newItem);

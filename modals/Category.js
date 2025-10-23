import mongoose from "mongoose";

const newCategory = new mongoose.Schema( // object structure for category
  {
    name: {      //name category
      type: String,
      required: true, 
      unique: true,
      trim: true,
    },
    image: {    //image category
      type: String,
    },
    description: {   //description category
      type: String,
    },
    taxApplicability: { //tax  category
      type: Boolean,
      default: false,
    },
    tax: {
      type: Number,
      default: 0,
    },
    taxType: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", newCategory);

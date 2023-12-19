import mongoose from "mongoose";
import validator from "validator";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required!"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  images: [String],
  banner: {
    type: String,
    required: [true, "Banner is required!"],
  },
  brand: {
    type: String,
    required: [true, "Brand is required!"],
  },
  quantity: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.index({ "$**": "text" });

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name",
  });
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
